# DevConsole Bridge Chrome Extension

## Installation

1. Create a new directory for the extension
2. Save the following files in that directory:
   - `manifest.json`
   - `content.js`
   - `background.js`

3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" (top right toggle)
5. Click "Load unpacked" and select the directory with your extension files

## How It Works

This extension captures `console.log()`, `console.warn()`, and `console.error()` messages and prepares them for forwarding to an external interface.

## Customization

The current implementation logs messages to the console. You'll need to modify `background.js` to implement your specific communication method with Cursor.

### Potential Communication Methods

1. WebSocket
2. Local HTTP server
3. Clipboard API
4. File writing to a shared location

## Limitations

- Only captures console messages from Chrome tabs
- Requires manual extension installation
- Needs custom implementation for actual message forwarding
