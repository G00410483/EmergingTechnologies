# ELIZA CHATBOT

### Overview
This project is web-based ELIZA chatbot, inspired by the earrly natural language processing program developed by Jospeh Weizenbaum in the 1960s. ELIZA simulates conversation with user, using a series of predefined responses to keywords and patterns in the input text. This project uses a JavaScript chat bot interface that uses regular expressions to parse user input and respond in conversational manner. 

### Project Structure
1. index.html: The HTML structure of the chatbot interface.
2. eliza.js: The JavaScript file containing ELIZA's response logic, input processing, and chat management functions.
3. style.css: The CSS file for styling the chatbot's UI, including animations and layout.

### Features
1. Natural Language Processing with Regular Expressions
  - The chatbox uses regular expressions to match patterns in user input and select appropriate responses.
2. User-friendly interface
  - A visually appealing interface with a chat history. timestamps, and seamless interaction flow.
3. Reset Management
  - Users can reset the chat history.
4. Responsive Design
  - The layout is adaptive to different screen sizes, providing an optiaml experience acorss devices.

### Usage
1. Open the CHat Interface: Typee a message in the input box at the bottom of the chat windows and press Enter or click the send button to start chatting.
2. ELIZA's Responses: ELIZA will analyze your inoput, matich it against known patters, and respond accordingly.
3. Reset Chat: Click the reset button in the header to clear the chat history and start fresh.

### Code Overview
#### eliza.js
- Response Patterns: The elizaResponses array holds objects with pattern and response properties.
- getElizaResponse() Function: Loops through elizaResponses to find a pattern match for the user input and returns a formatted response.
- processingInput() Function: Manages the user input, clears the input field, and displays ELIZA's response.
- addMessage() Function: Adds messages to the chat window, includes timestamps, and scrolls to the bottom.
- resetChat() Function: Clears the chat history.

#### style.css
The CSS file styles the chatbot interface, adding visual appeal and readability:
- Chat Container: A center-aligned, gradient-background chat container with glass effect.
- Messages Styling: Separate styles for user and bot messages, with speech bubble shapes, animations, and timestamps.
- Input Area: Styled with round input field and a custom send button.

## index.html
The HTML file defines the chatbot's structure:
- Header: Displays the chatbot title and reset button.
- Chat Box: Containes chat messages with user and bot classes forstyling.
- Input Field: A text input for user messages, and a send button to trigger responses.
