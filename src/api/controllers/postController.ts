import {RequestHandler} from "express";
import {Post} from "../models/post.js";
import axios from "axios";
import {verifyUser} from "../services/auth.js";
export const getAllPosts: RequestHandler = async (req, res, next) => {
    let posts = await Post.findAll();
    res.status(200).json(posts);
}

export const createPost: RequestHandler = async (req, res, next) => {
    let newPost: Post = req.body;
    let user = await verifyUser(req)
    console.log(user)
    if (newPost.post && user) {
        let created = await Post.create({...newPost, userName: user.userName});
        await created.save()
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}
export const getPost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    let postFound = await Post.findByPk(postId);
    if (postFound) {
        res.status(200).json(postFound);
    } else {
        res.status(404).json();
    }
}

export const updatePost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    let newPost: Post = req.body;

    let postFound = await Post.findByPk(postId);

    if (postFound && postFound.postId == newPost.postId
        && newPost.userName) {
        await Post.update(newPost, {
            where: {postId: postId}
        });
        res.status(200).json();
    } else {
        res.status(400).json();
    }
}

export const deletePost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    let postFound = await Post.findByPk(postId);

    if (postFound) {
        await Post.destroy({
            where: {postId: postId}
        });
        res.status(200).json();
    } else {
        res.status(404).json();
    }
}