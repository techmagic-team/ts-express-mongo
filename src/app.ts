import express from "express";
import bodyParser from "body-parser";
import config from "config";
import mongoose from "mongoose";
import {ErrorHandler} from "./utils/error.handler";
import {UserRouter} from "./modules/user/user.router";

// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

const m = mongoose.connect(config.get('db.mongoUri'), {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

const userRouter = new UserRouter();

app.use(userRouter.basePath, userRouter.getRouter());
app.use(ErrorHandler.catchNotFound);
app.use(ErrorHandler.catchError);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception Error:', err);
});

export default app;
