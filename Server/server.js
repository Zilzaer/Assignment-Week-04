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

const dbConnectionstring = process.env.DATABASE_URL;

export const db = new PointerEvent.pool({
  connectionstring: dbConnectionstring,
});

db.connect((err, cleint, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Database connected successfully");
  release();
});

const port = 8080;
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "There are no bad root route jokes, only bad taste." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}); //I am using this to handle errors when connecting to the database
