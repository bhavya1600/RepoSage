# RepoSage Backend

Backend API for the GitHub Repository Analyzer.

## Deployment on Vercel

This project is configured to be deployed on Vercel as a serverless application.

### Quick Deployment

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```

4. For production deployment:
   ```
   vercel --prod
   ```

### Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

### Environment Variables

Make sure to set up the following environment variables in your Vercel project:

- `GITHUB_TOKEN`: GitHub API token
- `OPENAI_API_KEY`: OpenAI API key

You can set these up in the Vercel dashboard or using the Vercel CLI:

```
vercel env add GITHUB_TOKEN
vercel env add OPENAI_API_KEY
```

## API Endpoints

- `GET /`: Health check endpoint
- `POST /api/analyze`: Analyze a GitHub repository
- `GET /api/download-analysis`: Download the latest analysis results 