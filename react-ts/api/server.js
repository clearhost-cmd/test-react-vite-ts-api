// Import the Express application from 'app.js'
const app = require('./app');

// Define the port number to listen on, using environment variable or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT);
