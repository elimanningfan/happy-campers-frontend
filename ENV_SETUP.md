# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```bash
# AI Blog Generation
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

## Getting Your API Keys

### Anthropic API Key
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## Usage
The AI blog generation feature requires the Anthropic API key to function. Without it, the blog generation will fail with an error.

## Security Notes
- Never commit your `.env.local` file to version control
- Keep your API keys secure and rotate them regularly
- Use environment-specific keys for production deployments
