import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    email?: string;
    password?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    profile?: {
        name?: string;
    };
}

export interface UserDocument extends mongoose.Document, IUser {
    comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string) => void;

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    profile: {
        name: String,
    }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", async function (next) {
    try {
        const user = this as UserDocument;
        if (!user.isModified("password")) { return next(); }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (e) {
        next(e);
    }

});

const comparePassword: comparePasswordFunction = async function (candidatePassword) {
    await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);
