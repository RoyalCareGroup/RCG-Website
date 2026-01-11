<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1nZ_33EhkyWGvCGoI9WZVYvzXkGPbeSZs

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Terminal Connection Diagnostics

If you need to check the terminal connection status or diagnose connectivity issues:

```bash
./check-terminal-connection.sh
```

This will verify:
- Git configuration
- Repository status
- DNS resolution
- Network connectivity to GitHub
- Network interface status
- GitHub Actions environment

For detailed connection information, see [TERMINAL_CONNECTION_STATUS.md](./TERMINAL_CONNECTION_STATUS.md)
