/* Filename: eliza.js */

// Common repsonses
// Responses are mapped to patterns
// Rules are matched in order
const elizaResponses = [
    { pattern: /\bhello\b|hi|hey|greetings|good\s+(morning|afternoon|evening)/i, response: "Hello! How are you feeling today?" },
    { pattern: /my name is (.*)/i, response: "It's a pleasure to meet you, $1. How has your day been so far?" },
    { pattern: /I need (.*)/i, response: "What makes you feel you need $1?" },
    { pattern: /I (?:am|feel) (?:really )?(sad|unhappy|depressed|down)/i, response: "I'm sorry to hear that you're feeling $1. Would you like to talk about what's causing these feelings?" },
    { pattern: /I'm stressed|I feel stressed|stressful/i, response: "Stress can be overwhelming. What's contributing to your stress lately?" },
    { pattern: /I (?:don't|do not|can't|cannot) (.*)/i, response: "What do you think is holding you back from $1?" },
    { pattern: /I want to (.*)/i, response: "What steps do you think you can take towards $1?" },
    { pattern: /I (?:can’t|cannot) (.*)/i, response: "It might be challenging, but what if you tried to $1?" },
    { pattern: /I (?:am|feel) (happy|content|joyful|excited)/i, response: "That's wonderful! What's contributing to these positive feelings?" },
    { pattern: /I (.*) you/i, response: "What makes you say that you $1 me?" },
    { pattern: /What is your name\?/i, response: "I'm Eliza, your virtual conversation partner. How can I assist you today?" },
    { pattern: /Do you understand (.*)\?/i, response: "I aim to understand as much as I can. Could you elaborate more on $1?" },
    { pattern: /Why (.*)\?/i, response: "What are your thoughts on why $1?" },
    { pattern: /Because (.*)/i, response: "Do you feel that's the main reason, or are there other factors?" },
    { pattern: /I remember (.*)/i, response: "What significance does $1 hold for you?" },
    { pattern: /Do you believe in (.*)\?/i, response: "Beliefs can be very personal. What are your thoughts on $1?" },
    { pattern: /I think (.*)/i, response: "What leads you to believe that $1?" },
    { pattern: /I feel like (.*)/i, response: "Let's explore why you feel that $1." },
    { pattern: /How are you\?/i, response: "I'm here to support you. How are you feeling today?" },
    { pattern: /Can you help me with (.*)\?/i, response: "Certainly! Let's discuss $1. What would you like to know?" },
    { pattern: /I'm (\d+) years old/i, response: "Being $1 can bring unique experiences. How do you feel at this age?" },
    { pattern: /Tell me a joke/i, response: "Sure! Why don't scientists trust atoms? Because they make up everything!" },
    { pattern: /What can you do\?/i, response: "I'm here to listen and help you reflect on your thoughts and feelings." },
    { pattern: /Goodbye|bye|see you later|farewell/i, response: "Take care! I'm here whenever you need to talk." },
    { pattern: /I regret (.*)/i, response: "Regret can be tough. What about $1 do you wish had been different?" },
    { pattern: /I wish (.*)/i, response: "What steps could you take to make $1 a reality?" },
    { pattern: /(.*) friend (.*)/i, response: "Tell me more about your friends and how they impact you." },
    { pattern: /Yes, (.*)/i, response: "You seem certain. Can you explain more about $1?" },
    { pattern: /No, (.*)/i, response: "What leads you to say no about $1?" },
    { pattern: /Maybe (.*)/i, response: "What makes you unsure about $1?" },
    { pattern: /I feel (.*)/i, response: "Feelings are important. Let's delve into why you feel $1." },
    { pattern: /I can't sleep/i, response: "Sleep is crucial for well-being. What's keeping you awake?" },
    { pattern: /I'm worried about (.*)/i, response: "Worrying can be heavy. What's concerning you about $1?" },
    { pattern: /I lost (.*)/i, response: "I'm sorry to hear that. How are you coping with the loss of $1?" },
    { pattern: /I love (.*)/i, response: "Love is a strong feeling. What do you love about $1?" },
    { pattern: /I hate (.*)/i, response: "Hate can be intense. What makes you feel this way about $1?" },
    { pattern: /(.*) stress (.*)/i, response: "Stress affects many people. How does it impact you?" },
    { pattern: /I am looking forward to (.*)/i, response: "Anticipation can be exciting. What are you most excited about regarding $1?" },
    { pattern: /I feel lonely/i, response: "Loneliness can be difficult. Would you like to talk about what's making you feel this way?" },
    { pattern: /I don't feel well/i, response: "I'm sorry to hear that. Can you describe how you're feeling?" },
    { pattern: /I have been thinking about (.*)/i, response: "What's been on your mind regarding $1?" },
    { pattern: /People (.*)/i, response: "It sounds like others are influencing you. How do you feel about that?" },
    { pattern: /I am afraid of (.*)/i, response: "Fears can be challenging. What about $1 scares you?" },
    { pattern: /(.*) makes me happy/i, response: "It's great to find joy in things. What do you enjoy most about $1?" },
    { pattern: /(.*) makes me sad/i, response: "I'm sorry that $1 brings you sadness. Would you like to discuss it?" },
    { pattern: /I just (.*)/i, response: "How do you feel after $1?" },
    { pattern: /What should I do about (.*)\?/i, response: "What options have you considered regarding $1?" },
    { pattern: /Is it normal to (.*)\?/i, response: "Many people wonder about that. How does $1 make you feel?" },
    { pattern: /I can't decide between (.*) and (.*)/i, response: "Both options have their merits. What are your thoughts on $1 and $2?" },
    { pattern: /I miss (.*)/i, response: "Missing someone can be hard. What do you miss most about $1?" },
    { pattern: /I am confused about (.*)/i, response: "Let's try to clarify. What specifically confuses you about $1?" },
    { pattern: /I lied about (.*)/i, response: "Honesty can be difficult. What led you to lie about $1?" },
    { pattern: /I am angry because (.*)/i, response: "Anger is a natural emotion. What's fueling your anger about $1?" },
    { pattern: /(.*) is frustrating/i, response: "Frustrations can build up. What about $1 frustrates you?" },
    { pattern: /I can't forgive (.*)/i, response: "Forgiveness can be challenging. What's preventing you from forgiving $1?" },
    { pattern: /I feel guilty about (.*)/i, response: "Guilt can weigh heavily. Would you like to talk about $1?" },
    { pattern: /I achieved (.*)/i, response: "Congratulations on achieving $1! How do you feel about this accomplishment?" },
    { pattern: /(.*) disappoints me/i, response: "Disappointment can be tough. What expectations did you have for $1?" },
    { pattern: /I procrastinate/i, response: "Procrastination is common. What tasks are you putting off?" },
    { pattern: /I need advice on (.*)/i, response: "I'm here to listen. What are your concerns about $1?" },
    { pattern: /I (?:can't|cannot) focus/i, response: "Difficulty focusing can be frustrating. What's on your mind?" },
    { pattern: /I feel overwhelmed/i, response: "Overwhelm can be intense. What's contributing to these feelings?" },
    { pattern: /Life is (.*)/i, response: "Life can be complex. Why do you say it's $1?" },
    { pattern: /I want to change (.*)/i, response: "Change can be positive. What steps might you take to change $1?" },
    { pattern: /I don't trust (.*)/i, response: "Trust issues can be significant. What happened with $1?" },
    { pattern: /I'm afraid to (.*)/i, response: "Fear can hold us back. What worries you about $1?" },
    { pattern: /I feel sick/i, response: "I'm sorry you're not feeling well. Have you considered seeking medical advice?" },
    { pattern: /I can't stop thinking about (.*)/i, response: "It seems $1 is on your mind a lot. What's compelling about it?" },
    { pattern: /My family (.*)/i, response: "Family dynamics can be complex. How does $1 affect you?" },
    { pattern: /I dreamt about (.*)/i, response: "Dreams can reveal a lot. What do you think your dream about $1 means?" },
    { pattern: /I spend too much time (.*)/i, response: "Balance is important. How does spending time on $1 affect you?" },
    { pattern: /I feel (.*) about my job/i, response: "Work can impact our well-being. What's causing you to feel $1 about your job?" },
    { pattern: /I am excited about (.*)/i, response: "Excitement can be energizing. What are you looking forward to in $1?" },
    { pattern: /I (?:can't|cannot) forgive myself/i, response: "Self-forgiveness is vital. What's making it difficult for you?" },
    { pattern: /What do you think about (.*)\?/i, response: "I'm interested in your perspective on $1. What are your thoughts?" },
    { pattern: /Am I (.*)\?/i, response: "What makes you question whether you're $1?" },
    { pattern: /I feel disconnected/i, response: "Feeling disconnected can be isolating. What's contributing to this feeling?" },
    { pattern: /I have too much on my plate/i, response: "Managing responsibilities can be tough. How can you prioritize?" },
    { pattern: /I don't know what to do/i, response: "Uncertainty can be challenging. What options are you considering?" },
    { pattern: /I overthink (.*)/i, response: "Overthinking can be exhausting. What's causing you to overthink $1?" },
    { pattern: /I wish I could (.*)/i, response: "What steps could you take toward being able to $1?" },
    { pattern: /I don't feel (.*)/i, response: "What do you think is contributing to not feeling $1?" },
    { pattern: /(.*) scares me/i, response: "Fear is natural. What about $1 scares you?" },
    { pattern: /I made a mistake/i, response: "Mistakes are part of learning. What happened?" },
    { pattern: /I can't handle (.*)/i, response: "It might feel overwhelming. What about $1 is challenging?" },
    { pattern: /I'm not good enough/i, response: "Self-doubt can be tough. Why do you feel this way?" },
    { pattern: /I need to improve (.*)/i, response: "Self-improvement is commendable. How might you work on $1?" },
    { pattern: /I feel trapped/i, response: "Feeling trapped can be suffocating. What's making you feel this way?" },
    { pattern: /I don't like (.*)/i, response: "What aspects of $1 don't you like?" },
    { pattern: /I saw (.*)/i, response: "What did seeing $1 make you think or feel?" },
    { pattern: /I'm addicted to (.*)/i, response: "Acknowledging addiction is a big step. Would you like to discuss it?" },
    { pattern: /I can't (.*) anymore/i, response: "It sounds like you're at a limit. What's making $1 so difficult now?" },
    { pattern: /I'm in pain/i, response: "I'm sorry to hear that. Would you like to talk about what's causing your pain?" },
    { pattern: /I feel restless/i, response: "Restlessness can be unsettling. What's contributing to this feeling?" },
    { pattern: /I don't belong/i, response: "Feeling out of place can be hard. What's making you feel this way?" },
    { pattern: /I failed (.*)/i, response: "Failure can be a learning experience. What happened with $1?" },
    { pattern: /I need a break/i, response: "Taking time for yourself is important. How can you plan for a break?" },
    { pattern: /I can't control (.*)/i, response: "Lack of control can be frustrating. What aspects of $1 are uncontrollable?" },
    { pattern: /I feel numb/i, response: "Feeling numb can be a sign of deeper issues. Would you like to explore this?" },
    { pattern: /I want to forgive (.*)/i, response: "Forgiveness can be healing. What's prompting you to forgive $1?" },
    { pattern: /I feel rejected/i, response: "Rejection can hurt. What happened to make you feel this way?" },
    { pattern: /I want to understand (.*)/i, response: "Seeking understanding is great. What do you currently know about $1?" },
    { pattern: /I am proud of (.*)/i, response: "That's wonderful! What about $1 makes you proud?" },
    { pattern: /I feel inspired by (.*)/i, response: "Inspiration can be motivating. How does $1 inspire you?" },
    { pattern: /I can't forgive myself for (.*)/i, response: "Self-compassion is important. What's making forgiveness difficult?" },
    { pattern: /I want to explore (.*)/i, response: "Exploration can lead to growth. What interests you about $1?" },
    { pattern: /I feel at peace/i, response: "That's a serene feeling. What's contributing to your sense of peace?" },
    { pattern: /I need closure on (.*)/i, response: "Closure can help you move forward. What might help you achieve it regarding $1?" },
    { pattern: /I feel grateful for (.*)/i, response: "Gratitude is uplifting. What about $1 are you most thankful for?" },
    { pattern: /I feel disconnected from (.*)/i, response: "Reconnection might help. What changed with $1?" },
    { pattern: /I am curious about (.*)/i, response: "Curiosity leads to learning. What would you like to know about $1?" },
    { pattern: /I want to be more (.*)/i, response: "Personal growth is admirable. How might you become more $1?" },
    { pattern: /I feel hopeful/i, response: "Hope can be powerful. What's giving you this sense of hope?" },
    { pattern: /I struggle with (.*)/i, response: "Struggles can be overcome. What's challenging about $1?" },
    { pattern: /I feel judged/i, response: "Feeling judged can be isolating. Who do you feel is judging you?" },
    { pattern: /I want to let go of (.*)/i, response: "Letting go can be freeing. What's holding you back from releasing $1?" },
    { pattern: /I feel pressured/i, response: "Pressure can be intense. What's causing you to feel this way?" },
    { pattern: /I want to make amends with (.*)/i, response: "Reconciliation can be healing. How might you approach $1?" },
    { pattern: /I am uncertain about (.*)/i, response: "Uncertainty is natural. What information might help clarify $1?" },
    { pattern: /I need support with (.*)/i, response: "Support is important. How can others assist you with $1?" },
    { pattern: /I feel misunderstood/i, response: "Being misunderstood can be frustrating. What would you like others to understand?" },
    { pattern: /I am excited about the future/i, response: "Optimism is great! What are you looking forward to?" },
    { pattern: /I want to learn (.*)/i, response: "Learning new things is enriching. How will you start with $1?" },
    { pattern: /I feel empowered/i, response: "That's fantastic! What's contributing to your sense of empowerment?" },
    { pattern: /.*/, response: "Please, tell me more about that." }
].map(rule => ({
    // ... is the spread operator
    // rule is an object with pattern and response properties
    ...rule,
    // pattern is a regular expression
    // new RegExp() is used to create a new regular expression
    // rule.pattern.source is the pattern string
    // rule.pattern.flags is the pattern flags
    pattern: new RegExp(rule.pattern.source, rule.pattern.flags) // Precompile regex
}));

// Conversation state
let conversationState = {
    // Last topic of conversation
    lastTopic: null,
    // User's mood
    mood: null
};

// Function to get ELIZA's response based on user input
function getElizaResponse(input) {
    // Check if the user mentioned the last topic of conversation
    for (let rule of elizaResponses) {
        // match() method searches a string for a match against a regular expression
        let match = input.match(rule.pattern);
        if (match) {
            // conversationState.lastTopic is set to the first capturing group
            conversationState.lastTopic = match[1] || null;
            return rule.response.replace("$1", match[1] || '');
        }
    }
    return "I'm here to listen. Please, go on.";
}

const synonyms = {
    happy: ["joyful", "content", "pleased"],
    sad: ["unhappy", "depressed", "down"]
};

function normalizeInput(input) {
    for (let [canonical, syns] of Object.entries(synonyms)) {
        const regex = new RegExp(`\\b(${syns.join('|')})\\b`, 'gi');
        input = input.replace(regex, canonical);
    }
    return input;
}

// Apply normalization before matching
function processInput() {
    const userInputField = document.getElementById('user-input');
    const userText = normalizeInput(userInputField.value.trim());

    if (userText === '') return;
    addMessage(userText, 'user');
    userInputField.value = '';
    userInputField.focus();

    const elizaResponse = getElizaResponse(userText);
    setTimeout(() => addMessage(elizaResponse, 'bot'), 500);
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

