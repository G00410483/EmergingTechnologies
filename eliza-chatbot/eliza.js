/* Filename: eliza.js */

// Define the common Eliza responses
const elizaResponses = [
    { pattern: /hello|hi|hey/i, response: "Hello! How can I help you today?" },
    { pattern: /my name is (.*)/i, response: "Nice to meet you, $1. How can I assist you?" },
    { pattern: /I need (.*)/i, response: "Why do you need $1?" },
    { pattern: /I am feeling (.*)/i, response: "Why do you feel $1?" },
    { pattern: /.*/, response: "Tell me more." }
];

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