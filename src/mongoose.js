//const uri = 'mongodb+srv://amanborkar995:Amanborkar@cluster0.idnlnd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;