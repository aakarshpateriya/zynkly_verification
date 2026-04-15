require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cleanerRoutes = require("./routes/cleaner");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cleaner", cleanerRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});