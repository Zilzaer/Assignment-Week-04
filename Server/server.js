import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(
  cors({
    origin: "https://assignment-week-04.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
dotenv.config();

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
