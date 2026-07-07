require("dotenv").config();
const app = require('./src/app.js');
const connectDB = require('./src/config/database.js');
const Data = require("./src/services/temp.js")
const generateInterviewReport = require("./src/services/ai.service.js")


connectDB()
generateInterviewReport(Data);

app.listen(3000, () => {
    console.log("server is running on port 3000");
    
})