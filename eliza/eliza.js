/* Filename: eliza.js */


// Function to get the Eliza response
// Takes an input string and returns a response
function getElizaResponse(input) {
    // Loop through the rules and find a match
    for (let rule of elizaResponses) {
        // Check if the input matches the pattern
        let match = input.match(rule.pattern);
        if (match) {
            // Return the response with the match
            return rule.response.replace("$1", match[1]);
        }
    }
}

// Function to process user input
// Takes the input from the user and displays it in the chat box
function processInput(input) {
    // Get the input field and chat box
    const inputField = document.getElementById("user-input");
    // Get the chat box
    const chatBox = document.getElementById("chat-box");
    // Get the user's message
    const userMessage = inputField.value;
    
    // Display user's message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    
    // Get ELIZA's response
    const response = getElizaResponse(userMessage);
    // Display ELIZA's response
    chatBox.innerHTML += `<p><strong>ELIZA:</strong> ${response}</p>`;
    
    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Clear input field
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