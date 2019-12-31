'use strict';

import {UserDao} from "../../dao/user.dao";

const userDao = new UserDao();

export class UserService {
    async getAllUsers() {
        return await userDao.findAll();
    }
    async createUser(user: {email: string}) {
        return await userDao.create(user);
    }
}
