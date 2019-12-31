import Joi from "@hapi/joi";
import {ValidationError} from "../../errors/validation.error";

const UserSchema = {
    email: Joi.string().email(),
};

export namespace UserValidation {
    export class RequestValidator {
        static createUser(body: any) {
            const {error, value} = Joi.object({
                email: UserSchema.email,
            }).validate(body);
            if (error) {
                throw new ValidationError(error.message);
            }
            return value;
        }
    }
}
