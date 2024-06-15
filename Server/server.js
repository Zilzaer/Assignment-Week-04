import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express(); //creates an instance of the express application
app.use(
  cors({
    origin: "https://assignment-week-04.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  }) // used to configure cors so i can allow requests from my targeted origin using GET and POST methods and credentials
);
app.use(express.json()); //middleware to parse incoming json requests
dotenv.config(); //loads environment variables from my .env file into process.env to keep my database connection string secure

const dbConnectionstring = process.env.DATABASE_URL; // retrieves the database connection string from the environment variables

export const db = new PointerEvent.pool({
  connectionstring: dbConnectionstring,
});

db.connect((err, cleint, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Database connected successfully");
  release();
}); // i am using this log if the database successfully connects or if an error occured

const port = 8080;
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`); //starts my server on my specified port and logs a message to indicate the server is running
});

app.get("/", (req, res) => {
  res.json({
    message: "There are no bad root route jokes, only bad taste. - Joe 2024",
  });
}); //used to define a GET route for the root URL ('/'). when the GET request is made to the root URL, the server resons with a JSON message

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}); //error handling middleware to catch any errors that occur during the request-response cycle
