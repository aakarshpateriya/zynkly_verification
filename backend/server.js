require("dotenv").config();
const express = require("express");
const cors = require("cors");


const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./config/db");
const cleanerRoutes = require("./routes/cleanerRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);

connectDB();

// Routes
app.use("/api/cleaner", cleanerRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});