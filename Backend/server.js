require("dotenv").config()
const app = require("./src/app.js")
const connectToDB = require("./src/config/database.js")

console.log(process.env.MONGO_URI);
connectToDB()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});