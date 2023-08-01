const Post = require('../models/post');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const createPost = async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(StatusCodes.OK).json(savedPost);
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const updatePost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(StatusCodes.OK).json('The post has been updated');
        }else{
            res.status(StatusCodes.FORBIDDEN).json('you can update only your posts');
        }
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const deletePost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(StatusCodes.OK).json('The post has been deleted');
        }else{
            res.status(StatusCodes.FORBIDDEN).json('You can only delete your post');
        }
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const getPost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(StatusCodes.OK).json(post);
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const reactOnPost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(StatusCodes.OK).json("The post has been liked");
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(StatusCodes.OK).json("The post has been disliked");
        }
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = {createPost, updatePost, deletePost, getPost, reactOnPost};

