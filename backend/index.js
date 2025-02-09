// run `node index.js` in the terminal

const express = require('express');
const cors = require('cors');
const { Octokit } = require('@octokit/rest');
const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to analyze GitHub repository
app.post('/api/analyze', async (req, res) => {
    const { repo, githubToken, openaiToken } = req.body;

    // Validate inputs
    if (!repo || !githubToken || !openaiToken) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        // Extract owner and repo name from URL
        const repoUrl = new URL(repo);
        const [, owner, repoName] = repoUrl.pathname.split('/');

        // Initialize GitHub client
        const octokit = new Octokit({
            auth: githubToken
        });

        // Initialize OpenAI client
        const openai = new OpenAI({
            apiKey: openaiToken
        });

        // Set up streaming response
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        // Function to send updates to client
        const sendUpdate = (message) => {
            res.write(message + '\n');
        };

        // Get repository information
        sendUpdate('Fetching repository information...');
        const repoInfo = await octokit.repos.get({
            owner,
            repo: repoName
        });

        // Get repository contents
        sendUpdate('Analyzing repository structure...');
        const contents = await octokit.repos.getContent({
            owner,
            repo: repoName,
            path: ''
        });

        // Get recent commits
        sendUpdate('Fetching recent commits...');
        const commits = await octokit.repos.listCommits({
            owner,
            repo: repoName,
            per_page: 10
        });

        // Prepare analysis data
        const analysisData = {
            name: repoInfo.data.name,
            description: repoInfo.data.description,
            stars: repoInfo.data.stargazers_count,
            forks: repoInfo.data.forks_count,
            language: repoInfo.data.language,
            contents: contents.data.map(item => ({
                name: item.name,
                type: item.type,
                size: item.size
            })),
            recentCommits: commits.data.map(commit => ({
                message: commit.commit.message,
                author: commit.commit.author.name,
                date: commit.commit.author.date
            }))
        };

        // Generate analysis with OpenAI
        sendUpdate('Generating detailed analysis...');
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: `Analyze this GitHub repository and create a detailed markdown report:
                Repository: ${analysisData.name}
                Description: ${analysisData.description}
                Language: ${analysisData.language}
                Stars: ${analysisData.stars}
                Forks: ${analysisData.forks}
                
                Structure:
                ${JSON.stringify(analysisData.contents, null, 2)}
                
                Recent Commits:
                ${JSON.stringify(analysisData.recentCommits, null, 2)}
                
                Please provide a comprehensive analysis including:
                1. Overview of the project
                2. Technical stack and architecture
                3. Code organization and structure
                4. Recent development activity
                5. Recommendations for improvement
                
                Format the response in markdown.`
            }],
            temperature: 0.7,
            max_tokens: 2000
        });

        const analysis = completion.choices[0].message.content;

        // Save analysis to file
        sendUpdate('Saving analysis results...');
        await fs.writeFile(
            path.join(__dirname, 'analysis_results.md'),
            analysis
        );

        // Send final analysis
        res.write(analysis);
        res.end();

    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        } else {
            res.write(`Error: ${error.message}`);
            res.end();
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
