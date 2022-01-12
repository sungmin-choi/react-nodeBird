const express = require('express');
const router = express.Router();
const {Post, Comment, Image, User} = require('../models');
const {isLoggedIn} = require('../passport/middlewares');

router.post('/',isLoggedIn, async(req, res, next)=>{
    try{
        
        const post=await Post.create({ //데이터베이스에 잘 저장이 됩니다.
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
        // 여기까지 제대로 생성됩니다.
        res.status(201).json(fullPost);//fullPost 데이터가 프런트로 안보내집니다.
        console.log('여기까지 실행이 됩니다');
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
        const fullComment = await Comment.findOne({
            where:{ id: comment.id},
            include:[
                {
                    model:User,
                    atrribute:['id','nickname'],
                }
            ]

        })
        res.status(201).json(fullComment);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.delete('/', (req,res)=>{
    res.json({id:1});
});

module.exports = router;