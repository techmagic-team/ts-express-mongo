import {IUser} from "../../models/User";

export class UserDto {
    static toPublic(user: IUser) {
        return {
            email: user.email,
            name: user.profile.name,
        }
    }
}
