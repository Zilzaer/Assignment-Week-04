// Import necessary modules
import express from "express";
import cors from "cors";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

// Create an instance of the express application
const app = express();
const port = process.env.PORT || 8080; // Use PORT from environment variables or default to 8080

// Middleware setup
app.use(
  cors({
    origin: "https://assignment-week-04.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  })
); // Configure CORS to allow requests from specific origin with GET and POST methods and credentials
app.use(express.json()); // Middleware to parse incoming JSON requests

// Initialize Supabase client using environment variables from Render
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Database connection setup (assuming you're using PostgreSQL)
const dbConnectionString = process.env.SUPABASE_URL; // Retrieve database connection string from environment variables
const pool = new pg.Pool({ connectionString: dbConnectionString }); // Create a PostgreSQL connection pool

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Database connected successfully");
  release(); // Release the client back to the pool
}); // Connect to the database and log success or error

// Define routes
app.get("/", (req, res) => {
  res.json({
    message: "There are no bad root route jokes, only bad taste. - Joe 2024",
  });
}); // Define a GET route for the root URL ('/'), responds with a JSON message

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}); // Error handling middleware to catch and respond with a 500 status for any unhandled errors during request-response cycle

// Start the server
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`);
}); // Start the server on the specified port and log a message to indicate the server is running

const messageForm = document.querySelector("message-form");

function handleSubmitMessageForm(event) {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const message = formData.get("message");

  fetch(
    "https://assignment-week-04-server.onrender.com/messages",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );
}

app.post("/messages", async (req, res) => {
  console.log("req.body", req.body);
  const { message } = req.body;

  try {
    // Insert message into the Supabase database
    const { data, error } = await supabase
      .from("messages")
      .insert([{ message }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ status: "Message received!", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

formData.addEventListener("submit", handleSubmitMessageForm);
