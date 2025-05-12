const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const MONGO_URI = "mongodb+srv://harinimano2686:Hari14%2310%21@cluster0.mongodb.net/User?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ MongoDB Atlas connected successfully");
});

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Schema + Model
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

// Routes

// Get all reviews
app.get("/User", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// Add a new review
app.post("/User", async (req, res) => {
  try {
    const { name, rating, comment, email } = req.body;
    const newReview = new Review({ name, rating, comment, email });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error submitting review", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("🚀 Server running at http://localhost:${PORT}");
});