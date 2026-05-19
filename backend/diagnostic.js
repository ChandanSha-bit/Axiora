const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log("🔍 Starting Database Diagnostic...");
console.log("URI being used:", process.env.MONGO_URI ? "Found" : "Missing");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Success! Database connected perfectly.");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Diagnostic Failed!");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    process.exit(1);
  });
