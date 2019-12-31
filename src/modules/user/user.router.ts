import {UserController} from "./user.controller";
import {AppRouter} from "../app.router";
import {Router} from "express";
const router = Router();

export class UserRouter extends AppRouter{
    public basePath = '/users';

    public getRouter(): Router {
        router.get('/', UserController.getAllUsers);
        router.post('/', UserController.createUser);
        return router;
    }
}
