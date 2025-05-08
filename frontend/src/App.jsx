import { useState } from 'react'
import './App.css'

function App() {
  const [repo, setRepo] = useState("")
  const [logs, setLogs] = useState("")
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAnalysisComplete(false)
    setLogs("")

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ repo })
      })
      
      if(response.ok && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let buffer = "" // Add buffer for incomplete chunks
        
        while(!done) {
          try {
            const { value, done: doneReading } = await reader.read()
            if (doneReading) {
              done = true;
              break;
            }
            
            const chunk = decoder.decode(value, { stream: true })
            buffer += chunk
            
            // Split buffer into lines, keeping any incomplete line in the buffer
            const lines = buffer.split('\n')
            buffer = lines.pop() || "" // Keep the last incomplete line in buffer
            
            for (const line of lines) {
              const trimmedLine = line.trim()
              if (trimmedLine.startsWith('LOG:')) {
                // This is a console log
                const logMessage = trimmedLine.substring(4)
                setLogs(prev => prev + logMessage + '\n')
              } else if (trimmedLine === 'ANALYSIS_COMPLETE') {
                // Analysis is complete and file is ready
                setAnalysisComplete(true)
                setLogs(prev => prev + "✅ Analysis complete! Click the Download button to get the results.\n")
              } else if (trimmedLine) {
                // Any other non-empty line goes to logs
                setLogs(prev => prev + trimmedLine + '\n')
              }
            }
          } catch (streamError) {
            console.error('Error reading stream:', streamError)
            setLogs(prev => prev + `Error reading stream: ${streamError.message}\n`)
            done = true
          }
        }
        
        // Process any remaining content in buffer
        if (buffer.trim()) {
          setLogs(prev => prev + buffer.trim() + '\n')
        }
      } else {
        const errorText = await response.text()
        setLogs(`Error: ${response.statusText}\n${errorText}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setLogs(prev => prev + `Error: ${error.message}\n`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/download-analysis')
      if (!response.ok) {
        throw new Error('Failed to download analysis file')
      }
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'analysis_results.md'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      setLogs(prev => prev + `Download error: ${error.message}\n`)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RepoSage</h1>
        <p className="subtitle">Generate comprehensive analysis for any GitHub repository</p>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="form-group">
            <label htmlFor="repo">GitHub Repository URL</label>
            <input
              id="repo"
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="https://github.com/owner/repo"
              required
            />
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Repository'}
            </button>

            <button 
              type="button"
              onClick={handleDownload}
              className={`download-button ${analysisComplete ? 'active' : 'inactive'}`}
              disabled={!analysisComplete}
            >
              Download Results
            </button>
          </div>
        </form>

        <div className="output-section">
          <h2>Progress</h2>
          <div className="console-output">
            {logs ? (
              <pre>{logs}</pre>
            ) : (
              <div className="placeholder-text">Progress will appear here...</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
