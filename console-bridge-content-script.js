// Capture console methods
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

// Debug log to verify script injection
originalLog('DevConsole Bridge content script loaded!');

console.log = function(...args) {
  // Call original log
  originalLog.apply(console, args);
  
  // Debug log using original method
  originalLog('Content script intercepted log:', args);
  
  // Send log to background script
  sendConsoleMessage('log', args);
};

console.warn = function(...args) {
  // Call original warn
  originalWarn.apply(console, args);
  
  // Debug log using original method
  originalLog('Content script intercepted warn:', args);
  
  // Send warn to background script
  sendConsoleMessage('warn', args);
};

console.error = function(...args) {
  // Call original error
  originalError.apply(console, args);
  
  // Debug log using original method
  originalLog('Content script intercepted error:', args);
  
  // Send error to background script
  sendConsoleMessage('error', args);
};

function sendConsoleMessage(type, args) {
  // Debug log using original method
  originalLog('Sending message to background script:', { type, args });
  
  // Convert arguments to strings
  const message = args.map(arg => {
    try {
      return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
    } catch (e) {
      return String(arg);
    }
  }).join(' ');

  // Send message to background script
  chrome.runtime.sendMessage({
    type: 'console_message',
    messageType: type,
    message: message
  });
}
