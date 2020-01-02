import express from "express";
import bodyParser from "body-parser";
import config from "config";
import mongoose from "mongoose";
import {ErrorHandler} from "./utils/error.handler";
import {UserRouter} from "./modules/user/user.router";
import {Application} from "express";

export default class App {
    private static app: Application;

    private async init(): Promise<Application> {
        // API keys and Passport configuration
    // import * as passportConfig from "./config/passport";

    // Create Express server
        const app = express();

        await mongoose.connect(config.get('db.mongoUri'), {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

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
        return app;
    }

    public async start() {
        const app = await App.getApplication();
        const server = app.listen(app.get("port"), () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                app.get("port"),
                app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
        return Promise.resolve(server);
    }

    public static async getApplication(): Promise<Application> {
        if (!App.app) {
            const instance =  new App();
            App.app = await instance.init();
        }
        return Promise.resolve(App.app);
    }
}

