import { useState, useEffect, useRef } from 'react'
import './App.css'

// Generate a unique session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
}

function App() {
  const [repo, setRepo] = useState("")
  const [logs, setLogs] = useState("")
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)
  
  // Use a more versatile API path that works with both local and serverless environments
  const path = process.env.NODE_ENV === 'production' 
    ? 'https://reposage-api.vercel.app' // Update this to your actual deployment URL
    : 'http://localhost:5000';
    
  console.log('Using API path:', path);
  
  // Create a new session ID when component mounts
  useEffect(() => {
    setSessionId(generateSessionId());
  }, []);
  
  // Reset the UI state for a new analysis
  const resetUIState = () => {
    setAnalysisComplete(false);
    setIsLoading(false);
    setIsCancelling(false);
    // Generate a new session ID to prevent conflicts
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    return newSessionId;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAnalysisComplete(false)
    setLogs("")
    
    // Generate a new session ID for this analysis
    const currentSessionId = generateSessionId();
    setSessionId(currentSessionId);

    try {
      const response = await fetch(`${path}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          repo,
          sessionId: currentSessionId
        })
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
      // Only set isLoading to false if we haven't already cancelled
      if (!isCancelling) {
        setIsLoading(false)
      }
      setIsCancelling(false)
    }
  }

  const handleCancel = async () => {
    if (!sessionId || !isLoading) return;
    
    try {
      setIsCancelling(true);
      
      // Even if the API is unavailable, we should reset the UI state
      let apiCallSucceeded = false;
      
      // First, verify the API is reachable with a health check
      try {
        const healthEndpoint = `${path}/api/health`;
        console.log('Checking API health at:', healthEndpoint);
        
        const healthResponse = await fetch(healthEndpoint);
        if (healthResponse.ok) {
          console.log('API health check passed');
          apiCallSucceeded = true;
        } else {
          console.log('API health check failed:', healthResponse.status, healthResponse.statusText);
        }
      } catch (healthError) {
        console.error('API health check error:', healthError);
      }
      
      const cancelEndpoint = `${path}/api/cancel-analysis`;
      setLogs(prev => prev + `Canceling analysis... (${cancelEndpoint})\n`);
      
      const cancelData = { sessionId };
      console.log('Sending cancel request with data:', cancelData);
      
      try {
        const response = await fetch(cancelEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(cancelData)
        });
        
        // Log the raw response for debugging
        console.log('Cancel response status:', response.status, response.statusText);
        
        if (response.ok) {
          apiCallSucceeded = true;
          let responseData;
          try {
            responseData = await response.json();
            console.log('Successful cancel response:', responseData);
          } catch (jsonError) {
            console.error('Error parsing success response:', jsonError);
          }
          
          setLogs(prev => prev + "✅ Analysis cancelled successfully.\n");
        } else {
          // Handle error response
          try {
            const contentType = response.headers.get("content-type");
            console.log('Response content type:', contentType);
            
            if (contentType && contentType.includes("application/json")) {
              const errorData = await response.json();
              console.log('Error data:', errorData);
              setLogs(prev => prev + `❌ Error cancelling analysis: ${errorData.error || 'Unknown error'}\n`);
            } else {
              // Not JSON, read as text
              const errorText = await response.text();
              console.log('Raw error response:', errorText.substring(0, 200) + '...');
              setLogs(prev => prev + `❌ Error cancelling analysis: Server returned status ${response.status}\n`);
            }
          } catch (parseError) {
            console.error("Error parsing response:", parseError);
            setLogs(prev => prev + `❌ Error cancelling analysis: Failed to parse server response. Status: ${response.status}\n`);
          }
        }
      } catch (fetchError) {
        console.error('Error fetching cancel endpoint:', fetchError);
        setLogs(prev => prev + `❌ Error cancelling analysis: Could not connect to server. ${fetchError.message}\n`);
      }
      
      // Even if the API call failed, reset the UI state after a short delay
      setTimeout(() => {
        // Reset the UI regardless of API call success
        resetUIState();
        setLogs(prev => prev + "UI reset complete. You can start a new analysis.\n");
      }, 1000);
      
    } catch (error) {
      console.error('Cancel error:', error);
      setLogs(prev => prev + `❌ Error cancelling analysis: ${error.message}\n`);
      
      // Reset UI even in case of an error
      setTimeout(() => {
        resetUIState();
        setLogs(prev => prev + "UI reset after error. You can start a new analysis.\n");
      }, 1000);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${path}/api/download-analysis`)
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
              disabled={isLoading || isCancelling}
            />
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading || isCancelling}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Repository'}
            </button>
            
            {isLoading && (
              <button 
                type="button"
                onClick={handleCancel}
                className="cancel-button"
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Analysis'}
              </button>
            )}

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
