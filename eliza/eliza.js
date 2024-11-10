/* Filename: eliza.js */
// Import the responses from responses.js
import elizaResponses from './responses.js';

// Function to get the Eliza response
// Takes an input string and returns a response
function getElizaResponse(input) {
    // Normalize input
    const normalizedInput = input.trim().toLowerCase();
    // Loop through the rules and find a match
    for (let rule of elizaResponses) {
        // Check if the input matches the pattern
        let match = input.match(rule.pattern);
        if (match) {
            // Handle cases where there might not be a capture group
            // If there is no capture group, return the response as is
            let response = rule.response;
            // If there is a capture group, replace the placeholder with the captured value
            // Iterate over the capture groups and replace the placeholders in the response
            for (let i = 1; i < match.length; i++) {
                // Replace the placeholder with the captured value
                response = response.replace(`$${i}`, match[i]);
            }
            // Return the response with the replaced values
            return response;
        }
    }
    // Default response
    return "Can you elaborate on that?";
}

// Function to process user input
// Takes the input from the user and displays it in the chat box
function processInput(event) {
    event.preventDefault(); // Prevent form submission
    // Get the input field and chat box
    const inputField = document.getElementById("user-input");
    // Get the chat box
    const chatBox = document.getElementById("chat-box");
    // Get the user message
    const userMessage = inputField.value;

    // Check if the user message is empty
    if (userMessage.trim() === '') return;
    
    // Display the user message in the chat box
    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    // Get the Eliza response
    const response = getElizaResponse(userMessage);
    // Display the Eliza response in the chat box
    chatBox.innerHTML += `<p><strong>ELIZA:</strong> ${response}</p>`;
    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
    // Clear the input field
    inputField.value = '';
}

// Reset the chat history
// Clears all messages from the chat box
function resetChat() {
    // Get the chat box
    const chatBox = document.getElementById("chat-box");
    // Clear the chat box
    chatBox.innerHTML = ''; // Clear all messages
}

// Export the functions
window.processInput = processInput;
