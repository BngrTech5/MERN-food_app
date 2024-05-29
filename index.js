const express = require('express');
const app = express();
const port = 3000;
const mongoDB = require('./db'); // Import the mongoDB function

// Middleware for setting CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes for user-related operations
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));

// Default route
app.get('/', (req, res) => {
    res.send('Hello world!....');
});

// Call the mongoDB function to establish the database connection
mongoDB()
    .then(() => {
        // Database connection successful, start the server
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((error) => {
        // Database connection failed, log the error
        console.error("Failed to connect to MongoDB:", error);
    });
