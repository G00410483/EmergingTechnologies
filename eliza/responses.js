// Description: This file contains the responses that Eliza can give to the user based on the patterns that are matched.
// The responses are stored as an array of objects, where each object contains a pattern and a response.
const responses = [
    { pattern: /hello|hi|hey/i, response: "Hello! How can I help you today?" },
    { pattern: /my name is (.*)/i, response: "Nice to meet you, $1. How can I assist you?" },
    { pattern: /I need (.*)/i, response: "Why do you need $1?" },
    { pattern: /I am feeling (.*)/i, response: "Why do you feel $1?" },
    { pattern: /I'm stressed|I feel stressed/i, response: "I'm here to listen. What's causing your stress?" },
    { pattern: /I am (sad|unhappy|depressed)/i, response: "I'm sorry to hear that you're feeling $1. Do you want to talk about it?" },
    { pattern: /I (don’t|don't|do not) know/i, response: "That's okay. Sometimes not knowing is part of the process." },
    { pattern: /I want to (.*)/i, response: "Why do you want to $1?" },
    { pattern: /I can’t (.*)|I cannot (.*)/i, response: "What's making you feel like you can't $1?" },
    { pattern: /I am (happy|content|joyful)/i, response: "That's wonderful to hear! What’s making you feel $1?" },
    { pattern: /I (.*) you/i, response: "Why do you $1 me?" },
    { pattern: /What is your name\?/i, response: "My name is Eliza. How can I assist you today?" },
    { pattern: /Do you understand (.*)\?/i, response: "I'm here to try to understand as best as I can. Could you tell me more about $1?" },
    { pattern: /Why (.*)\?/i, response: "Why do you think $1?" },
    { pattern: /Because (.*)/i, response: "Is that the only reason, or is there more to it?" },
    { pattern: /I remember (.*)/i, response: "What makes you think of $1 now?" },
    { pattern: /Do you believe in (.*)\?/i, response: "My beliefs aren’t like yours, but I’m here to help you explore $1 if you'd like." },
    { pattern: /I think (.*)/i, response: "What leads you to think $1?" },
    { pattern: /I feel like (.*)/i, response: "What makes you feel that way?" },
    { pattern: /How are you\?/i, response: "Thank you for asking! I'm here and ready to assist you." },
    { pattern: /Can you help me with (.*)\?/i, response: "I'll do my best to help you with $1. What do you need to know?" },
    { pattern: /I’m (.*) years old/i, response: "Age is just a number, but it does shape our experiences. How do you feel about being $1?" },
    { pattern: /Tell me a joke/i, response: "Why did the computer go to therapy? Because it had too many bytes of issues!" },
    { pattern: /What can you do\?/i, response: "I'm here to listen, ask questions, and help you reflect on your thoughts and feelings." },
    { pattern: /Goodbye|bye|see you later/i, response: "Goodbye! Feel free to return anytime you want to talk." },
    { pattern: /.*/, response: "Tell me more." }
];

// Export the responses for use in other files
export default responses;
