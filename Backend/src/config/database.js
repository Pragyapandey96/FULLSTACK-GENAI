const mongoose = require("mongoose")

async function connectToDB() {
  const attemptConnection = async (attempt = 1) => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })

      console.log("Connected to Database")
    } catch (err) {
      console.error(`MongoDB connection failed (attempt ${attempt}):`, err.message)
      setTimeout(() => attemptConnection(attempt + 1), 5000)
    }
  }

  return attemptConnection()
}

module.exports = connectToDB