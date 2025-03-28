// Debug log to verify script injection
console.log('DevConsole Bridge background script loaded!');

// Listen for console messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background script received message:', request);
  
  if (request.type === 'console_message') {
    console.log('Sending to local server:', {
      type: request.messageType,
      message: request.message,
      timestamp: new Date().toISOString()
    });
    
    // Send the message to the local server
    fetch('http://localhost:8080/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: request.messageType,
        message: request.message,
        timestamp: new Date().toISOString()
      }),
    })
    .then(response => {
      if (!response.ok) {
        console.error('Error sending log to server:', response.statusText);
      } else {
        console.log('Successfully sent message to server');
      }
    })
    .catch(error => {
      console.error('Fetch error sending log to server:', error);
    });

    // Optional: Still log to the background script's console for debugging
    console.log('Forwarded Console Message:', request.messageType, request.message);
  }
  return true; // Indicates potential asynchronous response (though we don't send one here)
});
