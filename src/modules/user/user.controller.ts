'use strict';
import {UserService} from "./user.service";
import {NextFunction, Request, Response} from "express";
import {UserValidation} from "./user.validation";
import RequestValidator = UserValidation.RequestValidator;
import httpStatus from "http-status";
import {UserDto} from "./user.dto";

const userService = new UserService();
export class UserController {
    static async getAllUsers (req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.json(users.map((user)=>UserDto.toPublic(user)));
        } catch (e) {
            next(e);
        }
    }
    static async createUser (req: Request, res: Response, next: NextFunction) {
        try {
            const userBody = RequestValidator.createUser(req.body);
            const user = await userService.createUser(userBody);
            res.status(httpStatus.CREATED).json(UserDto.toPublic(user));
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}
