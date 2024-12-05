// Array of response for the chatbot
// Each response has a pattern and a corresponding response
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
const elizaResponses = [
    {
        pattern: /\bhello\b|hi|hey|greetings/i,
        response: [
            "Hello! How are you feeling today?",
            "Hi there! What's on your mind?",
            "Hey! How can I assist you?"
        ]
    },

    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    {
        pattern: /\b(what day is it|today's day|current day)\b/i,
        response: () => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const today = new Date().getDay();
            return `Today is ${days[today]}.`;
        }
    },
    {
        pattern: /\b(what time is it|current time|time now)\b/i,
        response: () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
            return `The current time is ${formattedTime}.`;
        }
    },
    {
        pattern: /\b(what is the date|today's date|current date)\b/i,
        response: () => {
            const now = new Date();
            const month = now.getMonth() + 1; // Months are zero-indexed
            const day = now.getDate();
            const year = now.getFullYear();
            return `Today's date is ${month}/${day}/${year}.`;
        }
    },
    {
        pattern: /my name is (\w+)/i,
        response: (match) => {
            const name = match[1];
            return `It's a pleasure to meet you, ${name}. How has your day been so far?`;
        }
    },
    {
        pattern: /\bI am feeling (\w+)\b/i,
        response: (match) => {
            const emotion = match[1].toLowerCase();
            const emotions = ['happy', 'sad', 'angry', 'tired', 'excited'];
            if (emotions.includes(emotion)) {
                return `It's okay to feel ${emotion}. Would you like to share more about it?`;
            } else {
                return `I see you're feeling ${emotion}. Could you tell me more about why you're feeling this way?`;
            }
        }
    },
    {
        pattern: /\bI am (\w+)\b/i,
        response: (match) => {
            const stateOrName = match[1].toLowerCase();
            const positiveStates = ['good', 'fine', 'okay', 'well'];
            const emotions = ['happy', 'sad', 'angry', 'tired', 'excited'];
    
            if (positiveStates.includes(stateOrName)) {
                return `I'm glad to hear you're feeling ${stateOrName}. Is there anything you'd like to talk about?`;
            } else if (emotions.includes(stateOrName)) {
                return `It's okay to feel ${stateOrName}. Would you like to share more about it?`;
            } else {
                return `Nice to meet you, ${stateOrName}. How are you feeling today?`;
            }
        }
    },

    {
        pattern: /\bhow are you\b/i,
        response: [
            "I'm just a program, but I'm here to help you!",
            "I'm doing well, thank you for asking. How about you?",
            "I'm always ready to chat with you!"
        ]
    },
    {
        pattern: /\bthank you|thanks\b/i,
        response: [
            "You're welcome! Is there anything else on your mind?",
            "No problem at all! I'm here for you.",
            "Glad I could help! Let me know if you have more to share."
        ]
    },
    {
        pattern: /\bdo you understand\b/i,
        response: "I try my best to understand. Can you tell me more so I can help better?"
    },
    

    { pattern: /I (?:am|feel) (sad|unhappy|depressed|down)/i, response: "I'm sorry to hear that. Would you like to talk about what's making you feel this way?" },
    { pattern: /I (?:am|feel) (happy|content|joyful|excited)/i, response: "That's wonderful! What's contributing to your positive feelings?" },
    { pattern: /I'm stressed|I feel stressed|stressful/i, response: "Stress can be overwhelming. What's contributing to your stress?" },
    { pattern: /I need (.*)/i, response: "What makes you feel you need $1?" },
    { pattern: /I want to (.*)/i, response: "What steps do you think you can take toward $1?" },
    { pattern: /I (?:can't|cannot) (.*)/i, response: "It might be challenging, but what if you tried to $1?" },
    { pattern: /What is your name\?/i, response: "I'm Eliza, your virtual conversation partner. How can I assist you today?" },
    { pattern: /Why (.*)\?/i, response: "What are your thoughts on why $1?" },
    { pattern: /I feel like (.*)/i, response: "Let's explore why you feel that $1." },
    { pattern: /Goodbye|bye|see you later|farewell/i, response: "Take care! I'm here whenever you need to talk." },
    { pattern: /I regret (.*)/i, response: "Regret can be tough. What about $1 do you wish had been different?" },
    { pattern: /I feel lonely/i, response: "Loneliness can be difficult. Would you like to talk about what's making you feel this way?" },
    { pattern: /I am afraid of (.*)/i, response: "Fears can be challenging. What about $1 scares you?" },
    { pattern: /I feel overwhelmed/i, response: "Overwhelm can be intense. What's contributing to these feelings?" },
    { pattern: /.*/, response: "Please, tell me more about that." },
].map(rule => ({
    ...rule,
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    pattern: new RegExp(rule.pattern.source, rule.pattern.flags) // Precompile regex
}));


const synonyms = {
    hello: ["hi", "hey", "greetings", "howdy", "what's up", "morning", "afternoon", "evening", "salutations"],
    goodbye: ["bye", "farewell", "see you", "take care", "later", "adieu", "so long"],
    happy: ["joyful", "cheerful", "content", "ecstatic", "thrilled", "delighted", "blissful", "satisfied", "overjoyed", "elated"],
    sad: ["unhappy", "down", "depressed", "heartbroken", "blue", "sorrowful", "gloomy", "melancholic", "dejected", "miserable"],
    angry: ["mad", "furious", "irate", "enraged", "upset", "annoyed", "irritated", "exasperated", "vexed", "aggravated"],
    stressed: ["overwhelmed", "anxious", "worried", "pressured", "tense", "panicked", "frazzled", "burdened"],
    fearful: ["afraid", "scared", "terrified", "anxious", "nervous", "alarmed", "panicked", "apprehensive", "frightened"],
    love: ["adore", "cherish", "appreciate", "admire", "care for", "value", "treasure", "like"],
    hate: ["dislike", "despise", "detest", "loathe", "abhor", "resent"],
    help: ["assist", "aid", "support", "guide", "serve", "facilitate"],
    excited: ["thrilled", "eager", "enthusiastic", "elated", "delighted", "overjoyed", "ecstatic"],
    tired: ["exhausted", "weary", "fatigued", "drained", "worn out", "sleepy", "drowsy"],
    calm: ["peaceful", "relaxed", "tranquil", "serene", "soothing", "composed"],
    confused: ["perplexed", "bewildered", "puzzled", "baffled", "uncertain", "disoriented"],
    nervous: ["anxious", "worried", "uneasy", "apprehensive", "jumpy", "restless", "on edge"],
    strong: ["resilient", "capable", "powerful", "tough", "sturdy", "robust", "confident"],
    weak: ["vulnerable", "fragile", "frail", "delicate", "exhausted", "feeble"],
    regret: ["remorse", "guilt", "repentance", "shame", "sorrow", "contrition"],
    grateful: ["thankful", "appreciative", "obliged", "indebted", "blessed"],
    inspired: ["motivated", "driven", "uplifted", "encouraged", "empowered"],
    lonely: ["isolated", "alone", "solitary", "abandoned", "neglected"],
    worried: ["concerned", "anxious", "troubled", "distressed", "fearful", "uneasy"]

};

const sentiments = {
    positive: ['happy', 'joyful', 'excited'],
    negative: ['sad', 'angry', 'stressed'],
    neutral: ['okay', 'fine', 'normal']
};

const sentimentPhrases = {
    positive: ["That's great to hear!", "Wonderful!", "I'm glad you're feeling that way!"],
    negative: ["I'm sorry you're feeling that way.", "That sounds tough.", "I'm here for you."],
    neutral: ["I see.", "Okay.", "Tell me more."]
};

// Function to detect the sentiment of user input
function detectSentiment(input) {
    // Define words associated with positive, negative, and neutral sentiments
    const positiveWords = ["happy", "joyful", "excited", "great", "good"];
    const negativeWords = ["sad", "angry", "depressed", "bad", "terrible"];
    const neutralWords = ["okay", "fine", "normal"];

    let score = 0; // Initialize a score for sentiment analysis
    const words = input.toLowerCase().split(/\s+/); // Split the input into individual words

    // Iterate over the words and adjust the sentiment score
    words.forEach(word => {
        if (positiveWords.includes(word)) score++; // Increment score for positive words
        if (negativeWords.includes(word)) score--; // Decrement score for negative words
    });

    // Determine the sentiment based on the score
    const sentiment = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
    conversationState.context.sentimentHistory.push(sentiment); // Update the sentiment history in context
    return sentiment; // Return the detected sentiment
}

// Extend normalizeInput function for handling contractions
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
function normalizeInput(input) {
    // Create a contraction map for expansion
    const contractionMap = {
        "i'm": "i am",
        "you're": "you are",
        "he's": "he is",
        "she's": "she is",
        "it's": "it is",
        "we're": "we are",
        "they're": "they are",
        "i've": "i have",
        "you've": "you have",
        "we've": "we have",
        "they've": "they have",
        "i'd": "i would",
        "you'd": "you would",
        "he'd": "he would",
        "she'd": "she would",
        "we'd": "we would",
        "they'd": "they would",
        "i'll": "i will",
        "you'll": "you will",
        "he'll": "he will",
        "she'll": "she will",
        "we'll": "we will",
        "they'll": "they will",
        "can't": "cannot",
        "won't": "will not",
        "don't": "do not",
        "didn't": "did not",
        "isn't": "is not",
        "aren't": "are not",
        "wasn't": "was not",
        "weren't": "were not",
        "shouldn't": "should not",
        "wouldn't": "would not",
        "couldn't": "could not",
        "mightn't": "might not",
        "mustn't": "must not"
    };

    // Replace contractions with their expanded forms
    input = input.replace(/\b\w+'\w*\b/g, (match) => contractionMap[match.toLowerCase()] || match);

    // Create a synonym map object for other replacements
    const synonymMap = Object.entries(synonyms)
        .flatMap(([canonical, syns]) => syns.map(syn => ({ [syn]: canonical })))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    // Replace synonyms with their canonical forms
    return input.replace(/\b\w+\b/g, (word) => synonymMap[word.toLowerCase()] || word);
}

// Define the chatbot's conversation state to store user-specific details
let conversationState = {
    context: {
        name: null, // Stores the user's name (default is null if not provided)
        lastEmotion: null, // Tracks the last emotion mentioned by the user
        sentimentHistory: [], // Keeps a history of detected sentiments (positive, negative, neutral)
        previousTopics: [] // Stores previous topics discussed by the user
    }
};

// Function to update the context with a key-value pair
function updateContext(key, value) {
    conversationState.context[key] = value; // Adds or updates the key with the new value
}

// Function to retrieve a value from the context
function getContext(key) {
    return conversationState.context[key] || null; // Returns the value for the key, or null if it doesn't exist
}

// Function to match user input against a specific rule
function matchPattern(input, rule) {
    const match = input.match(rule.pattern); // Tests the input against the pattern in the rule
    if (match) { // If there's a match
        if (typeof rule.response === 'function') {
            // If the response is a function, call it with the match details
            return { match: true, response: rule.response(match) };
        }
        // Otherwise, return a random response from the response array
        return { match: true, response: getRandomResponse(rule.response) };
    }
    return { match: false }; // If no match, return false
}

// Function to select a random response from an array
function getRandomResponse(responses) {
    if (Array.isArray(responses)) { // Check if the responses are an array
        return responses[Math.floor(Math.random() * responses.length)]; // Return a random response
    }
    return responses; // If not an array, return the response as-is
}

// Function to generate Eliza's response based on user input.
function getElizaResponse(input) {
    // Iterate over all defined response rules
    for (let rule of elizaResponses) {
        // Check if the input matches the current rule's pattern
        const { match, response } = matchPattern(input, rule);

        // If the input matches the pattern, generate a response
        if (match) {
            // Detect the sentiment of the user input (positive, negative, neutral)
            const sentiment = detectSentiment(input);

            // Special case: If the rule matches a greeting, skip adding a sentiment prefix
            if (rule.pattern.test(/hello|hi|greetings/i)) {
                return response; // Directly return the greeting response
            }

            // If the sentiment is not neutral, add a sentiment-based prefix to the response
            if (sentiment !== 'neutral') {
                // Retrieve a sentiment-appropriate phrase (e.g., "That's great to hear!")
                const sentimentPrefix = getRandomResponse(sentimentPhrases[sentiment]);
                return `${sentimentPrefix} ${response}`; // Combine the prefix with the response
            }

            // Check if the user's name is stored in the context
            if (getContext('name')) {
                const name = getContext('name'); // Retrieve the user's name from the context
                // Insert the name into the response if applicable, and add a sentiment prefix
                return `${getRandomResponse(sentimentPhrases[sentiment])} ${response.replace("$name", name)}`;
            }

            // Return the matched response if no special handling is needed
            return response;
        }
    }

    // Default response if no rules match the input
    return "I'm here to listen. Please, go on.";
}

// Apply normalization before matching
function processInput() {
    // Get the user input field
    const userInputField = document.getElementById('user-input');
    const userTextOriginal = userInputField.value.trim(); // Keep original input for display

    // Normalize the user input for matching purposes
    const userTextNormalized = normalizeInput(userTextOriginal);

    // If the user input is empty, return
    if (userTextOriginal === '') return;

    // Add the original user message to the chat box
    addMessage(userTextOriginal, 'user');

    // Clear the user input field
    userInputField.value = '';
    userInputField.focus();

    // Get the sentiment of the normalized input
    const sentiment = detectSentiment(userTextNormalized);

    // Show the typing indicator
    showTypingIndicator();

    // Get the ELIZA response based on the normalized input
    const elizaResponse = getElizaResponse(userTextNormalized);

    setTimeout(() => {
        removeTypingIndicator();
        addMessage(elizaResponse, 'bot');
    }, 1000); // Simulate typing delay
}

// Function to show the typing indicator
function showTypingIndicator() {
    // Get the chat box element
    const chatBox = document.getElementById('chat-box');
    // Create a new div element for the typing indicator
    const typingIndicator = document.createElement('div');
    // Set the id and classes for the typing indicator
    typingIndicator.id = 'typing-indicator';
    // Add the 'message' and 'bot' classes to the typing indicator
    typingIndicator.classList.add('message', 'bot');
    // Set the typing indicator content
    typingIndicator.innerHTML = "Eliza is typing...";
    // Append the typing indicator to the chat box
    chatBox.appendChild(typingIndicator);
    // Scroll the chat box to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to remove the typing indicator
function removeTypingIndicator() {
    // Get the typing indicator element
    const typingIndicator = document.getElementById('typing-indicator');
    // If the typing indicator exists, remove it
    if (typingIndicator) typingIndicator.remove();
}


// Reset the chat history
function resetChat() {
    document.getElementById("chat-box").innerHTML = '';
}

// Function to add a message to the chat box
// content: message content
// sender: 'user' or 'bot'
function addMessage(content, sender) {
    // Get the chat box element
    const chatBox = document.getElementById('chat-box');
    // Create a new message element
    const message = document.createElement('div');
    // Add the 'message' and sender class to the message element
    message.classList.add('message', sender);
    // Set the message content
    message.innerHTML = content;

    // Create a timestamp element
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    const timestamp = document.createElement('span');
    // Add the 'timestamp' class to the timestamp element
    timestamp.classList.add('timestamp');
    // Set the timestamp content to the current time
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // Append the timestamp to the message
    message.appendChild(timestamp);

    // Append the message to the chat box
    chatBox.appendChild(message);

    // Scroll the chat box to the bottom
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', (e) => {
    // Process the input if the Enter key is pressed
    if (e.key === 'Enter') {
        processInput();
    }
});

