// Test code for the chatbot functionality
// This script tests if user inputs match expected patterns in the chatbot logic.

// Define sample test cases to evaluate the chatbot's response-matching logic.
// Each test case consists of a user input and an expected regex pattern it should match.
const testCases = [
    { input: "Hello", expectedPattern: /\bhello\b|hi|hey|greetings/i }, // Test for greeting input
    { input: "What day is it?", expectedPattern: /\b(what day is it|today's day|current day)\b/i }, // Test for asking the day
    { input: "What time is it?", expectedPattern: /\b(what time is it|current time|time now)\b/i }, // Test for asking the current time
    { input: "My name is John", expectedPattern: /my name is (\w+)/i }, // Test for name introduction
    { input: "I am feeling happy", expectedPattern: /\bI am feeling (\w+)\b/i }, // Test for expressing feelings
    { input: "How are you?", expectedPattern: /\bhow are you\b/i }, // Test for asking chatbot's state
    { input: "Thank you", expectedPattern: /\bthank you|thanks\b/i }, // Test for expressing gratitude
    { input: "I feel sad", expectedPattern: /I (?:am|feel) (sad|unhappy|depressed|down)/i }, // Test for negative emotion
    { input: "I regret not studying", expectedPattern: /I regret (.*)/i }, // Test for regret expression
    { input: "Goodbye", expectedPattern: /Goodbye|bye|see you later|farewell/i }, // Test for farewell
];

// Function to test if a user input matches the expected pattern
// Parameters:
// - input: The user input string
// - expectedPattern: The regex pattern the input should match
function testChatbot(input, expectedPattern) {
    const normalizedInput = normalizeInput(input); // Normalize input to handle synonyms and contractions
    let matched = false; // Flag to indicate if a match is found

    // Iterate through all response rules in the chatbot
    for (const rule of elizaResponses) {
        // Check if the normalized input matches the current rule's pattern
        const match = rule.pattern.test(normalizedInput);
        // Verify if the matched pattern is the expected pattern
        if (match && rule.pattern.source === expectedPattern.source) {
            matched = true; // Set the flag if the pattern matches
            break; // Stop further checks as a match is found
        }
    }

    // Log the test result to the console
    if (matched) {
        console.log(`✅ Passed: Input "${input}" matched the expected pattern.`);
    } else {
        console.error(`❌ Failed: Input "${input}" did not match the expected pattern.`);
    }
}

// Run all test cases to validate the chatbot's response logic
console.log("Running chatbot tests...\n"); // Indicate the start of the test process
testCases.forEach(testCase => {
    testChatbot(testCase.input, testCase.expectedPattern); // Test each case
});
console.log("\nTests complete."); // Indicate the end of the test process
