import { RequestHandler } from "express";
import { User } from "../models/users.js";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth.js";

export const createUser: RequestHandler = async (req, res, next) => {
    const newUser: User = new User({
        userId: req.body.userId,
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        state: req.body.state,
        bio: req.body.bio
    });

    try {
        if (newUser.userName && newUser.password) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                userName: created.userName,
                userId: created.userId
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne(
        {rejectOnEmpty: false, where: { userName: req.body.userName }}
    );

    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token, userName: existingUser.userName});
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne(
        {rejectOnEmpty: false, where: { userName: req.params.id }}
    );

    if (existingUser) {
        res.status(200).json(existingUser);
    }
    else {
        res.status(404).json('User not found');
    }
}