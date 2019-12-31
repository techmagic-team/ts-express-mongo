'use strict';
import {IUser, User} from "../models/User";
export class UserDao {
    async findByEmail (email: string) {
        return User.findOne({email});
    }

    async findAll () {
        return User.find();
    }

    async create (user: IUser) {
        return User.create(user);
    }
}
