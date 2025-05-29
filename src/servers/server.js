require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body

// ✅ MongoDB Connection (Local or Atlas)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ User Schema for Authentication
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// ✅ Booking Schema
const bookingSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  members: { type: Number, required: true },
  guests: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
      aadhar: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
});

const Booking = mongoose.model("Booking", bookingSchema);

// ✅ Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "✅ Login Successful" });
    } else {
      res.status(401).json({ message: "❌ Invalid username or password" });
    }
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Room Booking Route
app.post("/api/book-room", async (req, res) => {
  try {
    const { roomType, members, guests } = req.body;

    if (!roomType || !members || !guests || !Array.isArray(guests)) {
      return res.status(400).json({ error: "❌ Invalid input data" });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "✅ Booking Successful", data: newBooking });
  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  shift: String,
  salary: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

// 🟢 Get all employees
app.get("/api/employees/all", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
});

// 🟢 Add new employee
app.post("/api/employees/add", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error adding employee" });
  }
});

// 🟢 Edit employee details
app.put("/api/employees/edit/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee" });
  }
});

// 🛑 Delete employee
app.delete("/api/employees/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee" });
  }
});

// 🔄 Change employee shift
app.patch("/api/employees/change-shift/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { shift: req.body.shift },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error changing shift" });
  }
});

const complaintSchema = new mongoose.Schema({
  user_id: String,
  description: String,
  status: { type: String, default: "Pending" },
  admin_reply: { type: String, default: null },
  rating: { type: Number, default: null },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// Create a complaint
app.post("/complaints", async (req, res) => {
  const complaint = new Complaint(req.body);
  await complaint.save();
  res.json({ message: "Complaint submitted successfully", complaint_id: complaint._id });
});

// Get all complaints
app.get("/complaints", async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Reply to a complaint
app.put("/complaints/reply", async (req, res) => {
  const { complaint_id, admin_reply } = req.body;
  const result = await Complaint.findByIdAndUpdate(complaint_id, { admin_reply, status: "Resolved" });
  if (!result) return res.status(404).json({ message: "Complaint not found" });
  res.json({ message: "Reply added successfully" });
});

// Rate a complaint
app.put("/complaints/rate", async (req, res) => {
  const { complaint_id, rating } = req.body;
  const result = await Complaint.findByIdAndUpdate(complaint_id, { rating });
  if (!result) return res.status(404).json({ message: "Complaint not found" });
  res.json({ message: "Rating submitted successfully" });
});


// ✅ Default Route
//app.get("/", (req, res) => {
  //res.send("Welcome to the Hotel Management API 🚀");
//});
const roomsRouter = require('./routes/rooms');
app.use('/rooms', roomsRouter);


// ✅ Handle Unknown Routes
//app.use((req, res) => {
 // res.status(404).json({ error: "❌ Route Not Found" });
//});
//app.use(cors());



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

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, required: true },
  roomType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const Bookings = mongoose.model('RoomBooking', bookSchema);

// API Route to save booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, checkIn, checkOut, guests, roomType } = req.body;
    const newBooking = new Bookings({ name, email, phone, checkIn, checkOut, guests, roomType });
    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (error) {
    console.error('Booking save failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  venueName: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enquiry", enquirySchema);

app.post("/api/enquiries", async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully." });
  } catch (error) {
    console.error("❌ Error saving enquiry:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Add this in your server file
app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const totalBookings = await Bookings.countDocuments();
    const totalEmployees = await Employee.countDocuments();
    const totalComplaints = await Complaint.countDocuments();
    const pendingPayments = 55000; // You can pull from payment schema if added
    const availableRooms = 16; // This should be dynamic if you have room management
    const totalRooms = 21;
    const bookedRooms = totalRooms - availableRooms;
    const checkedIn = 2;
    const earnings = 85000;

    const bookingsByCountry = [
      { country: "India", count: 15 },
      { country: "USA", count: 10 },
      { country: "UK", count: 8 },
      { country: "Canada", count: 12 }
    ];

    const bookingsPerRoomType = [
      { type: "Deluxe", count: 20 },
      { type: "Standard", count: 15 },
      { type: "Suite", count: 10 }
    ];

    const monthlyRevenue = [
      { month: "Jan", revenue: 10000 },
      { month: "Feb", revenue: 8000 },
      { month: "Mar", revenue: 12000 },
      { month: "Apr", revenue: 15000 },
      { month: "May", revenue: 14000 }
    ];

    res.json({
      totalRooms,
      bookedRooms,
      availableRooms,
      checkedIn,
      totalBookings,
      totalEmployees,
      totalComplaints,
      earnings,
      pendingPayments,
      bookingsByCountry,
      bookingsPerRoomType,
      monthlyRevenue
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

const nodemailer = require("nodemailer");

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    // Set up transporter (use your actual credentials or use a service like SendGrid)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shekkinap@gmail.com',
        pass: 'ouze wfae hqtg gfui'  // Not your Gmail password. Use App Password.
      }
    });

    const mailOptions = {
      from: '"Your Hotel" <yourhotel@gmail.com>',
      to: email,
      subject: 'Welcome to Our Hotel Newsletter!',
      html: `
        <h2>Thanks for subscribing!</h2>
        <p>We’ll keep you updated with our latest offers, rooms, and services.</p>
        <p>Stay tuned!</p>
        <strong>- The Hotel Team</strong>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Subscription email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});



// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


