import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient' // Import Supabase client
import './App.css'

function App() {
  const [repo, setRepo] = useState("")
  const [logs, setLogs] = useState("")
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [currentAnalysisFilename, setCurrentAnalysisFilename] = useState(null) // To store the filename of the latest analysis
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false) // For auth operations

  // Auth state
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const path = "http://localhost:5000"

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      // Cleanup listener
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsAuthLoading(true)
    setLogs("")
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      // Session will be set by onAuthStateChange
    } catch (error) {
      setLogs(`Login Error: ${error.message}\n`)
      console.error('Login error:', error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsAuthLoading(true)
    setLogs("")
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      setLogs("Signup successful! Please check your email to confirm your account if email confirmation is enabled.\n")
      // Session will be set by onAuthStateChange after email confirmation if enabled
    } catch (error) {
      setLogs(`Signup Error: ${error.message}\n`)
      console.error('Signup error:', error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsAuthLoading(true)
    setLogs("")
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      // Session will be nulled by onAuthStateChange
    } catch (error) {
      setLogs(`Logout Error: ${error.message}\n`)
      console.error('Logout error:', error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!session) {
      setLogs("Please log in to analyze a repository.\n")
      return
    }
    setIsLoading(true)
    setAnalysisComplete(false)
    setLogs("")

    try {
      const response = await fetch(`${path}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}` // Add JWT token
        },
        body: JSON.stringify({ repo })
      })
      
      if(response.ok && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let buffer = ""
        
        while(!done) {
          try {
            const { value, done: doneReading } = await reader.read()
            if (doneReading) {
              done = true;
              break;
            }
            
            const chunk = decoder.decode(value, { stream: true })
            buffer += chunk
            
            const lines = buffer.split('\n')
            buffer = lines.pop() || ""
            
            for (const line of lines) {
              const trimmedLine = line.trim()
              if (trimmedLine.startsWith('LOG:')) {
                const logMessage = trimmedLine.substring(4)
                setLogs(prev => prev + logMessage + '\n')
              } else if (trimmedLine.startsWith('ANALYSIS_COMPLETE:')) {
                const completedFilename = trimmedLine.substring('ANALYSIS_COMPLETE:'.length);
                setCurrentAnalysisFilename(completedFilename); // Store the filename
                setAnalysisComplete(true)
                setLogs(prev => prev + `✅ Analysis complete for ${completedFilename}! Click Download to get results.\n`)
              } else if (trimmedLine) {
                setLogs(prev => prev + trimmedLine + '\n')
              }
            }
          } catch (streamError) {
            console.error('Error reading stream:', streamError)
            setLogs(prev => prev + `Error reading stream: ${streamError.message}\n`)
            done = true
          }
        }
        
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
    if (!session) {
      setLogs("Please log in to download analysis results.\n")
      return
    }
    if (!currentAnalysisFilename) {
      setLogs("No analysis file available to download. Please complete an analysis first.\n")
      return;
    }

    try {
      const response = await fetch(`${path}/api/download-analysis?filename=${encodeURIComponent(currentAnalysisFilename)}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to download analysis file' }));
        throw new Error(errorData.detail || 'Failed to download analysis file');
      }
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = currentAnalysisFilename // Use the actual filename for download
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      setLogs(prev => prev + `Download error: ${error.message}\n`)
    }
  }

  if (!session) {
    return (
      <div className="app-container auth-container">
        <header className="app-header">
          <h1>RepoSage</h1>
          <p className="subtitle">Login or Signup to continue</p>
        </header>
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isAuthLoading}>
            {isAuthLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <hr className="auth-divider" />
        <form onSubmit={handleSignup} className="auth-form">
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isAuthLoading}>
            {isAuthLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        {logs && (
          <div className="output-section" style={{ marginTop: '20px' }}>
            <h3>Status</h3>
            <div className="console-output">
              <pre>{logs}</pre>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RepoSage</h1>
        <div className="user-info">
          <span>Logged in as: {session.user.email}</span>
          <button onClick={handleLogout} disabled={isAuthLoading} className="logout-button">
            {isAuthLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
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
              disabled={!analysisComplete || isLoading}
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
