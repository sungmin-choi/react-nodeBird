const express = require('express');
const router = express.Router();
const {Post, Comment, Image, User} = require('../models');
const {isLoggedIn} = require('../passport/middlewares');

router.post('/',isLoggedIn, async(req, res, next)=>{
    try{
        const post=await Post.create({
            content:req.body.content,
            UserId: req.user.id,

            });
        const fullPost = await Post.findOne({
           where:{id:post.id},
           include:[{
            model:Image,
           },{
            model:Comment,   
           },{
            model:User,
           }
            ] 
        })
        res.status(201).json(fullPost);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/:postId/comment',isLoggedIn, async(req, res, next)=>{
    try{
        const post = await Post.findOne({
            where:{
                id:req.params.postId,
            }
        })
        if(!post){
            return res.status(401).send('존재하지 않는 포스트입니다.');
        }
        const comment=await Comment.create({
            content:req.body.content,
            UserId: req.user.id,
            PostId: req.params.postId,
            });
        res.status(201).json(comment);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.delete('/', (req,res)=>{
    res.json({id:1});
});

module.exports = router;