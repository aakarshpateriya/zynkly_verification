require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await Admin.create({
    email: "admin@zynkly.com",
    password: hashedPassword
  });

  console.log("✅ Admin Created");
  process.exit();
};

createAdmin();