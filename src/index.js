const express = require('express');
const userRouter = require('./router/users'); 
const connectDB = require('./mongoose')

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(userRouter);

const startServer = async () => {
  try {
    await connectDB('mongodb+srv://amanborkar995:Amanborkar@cluster0.idnlnd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    app.listen(8080, () => console.log("Server started"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
