import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import CreatePresaleRoute from "./src/routes/presale.js";
import UserRoute from "./src/routes/user.js";
// import ServiceRoute from "./routes/Service_route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB..");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
// app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/api/", CreatePresaleRoute);
app.use("/api/", UserRoute);



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(process.env.PORT, () => {
    connect();
    console.log("Server running..");
});
