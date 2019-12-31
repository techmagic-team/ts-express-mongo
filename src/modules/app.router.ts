import {Router} from "express";

export abstract class AppRouter {
    abstract basePath: string;
    abstract getRouter(): Router;
}
