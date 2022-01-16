const express = require('express');
const router = express.Router();
const {Post, Comment, Image, User} = require('../models');
const {isLoggedIn} = require('../passport/middlewares');



router.patch('/:postId/like', isLoggedIn, async(req, res, next)=>{
    try{
        const post = await Post.findOne({
            where:{id:req.params.postId}
        })
        if(!post){
            return res.status(403).send('존재하지 않는 포스트입니다.');
        }
        await post.addLikers(req.user.id);
        res.status(200).json({PostId:Number(req.params.postId), UserId:req.user.id});
    }catch(err){
        console.error(err);
        next(err);
    }
})

router.delete('/:postId/like',isLoggedIn, async(req, res, next)=>{
    try{
        const post = await Post.findOne({
            where:{id:req.params.postId}
        })
        if(!post){
            return res.status(403).send('존재하지 않는 포스트입니다.');
        }
        await post.removeLikers(req.user.id);
        res.status(200).json({PostId:Number(req.params.postId), UserId:req.user.id});
    }catch(err){
        console.error(err);
        next(err);
    }
})

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
           },{
            model:User,
            as:'Likers',
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
        const post = await Post.findOne({ //오늘도 아무것도 안함 ㅋㅋㅋㅋ
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

router.delete('/:postId',isLoggedIn, async(req,res,next)=>{
    try{
        const post = await Post.destroy({
            where:{
                id: req.params.postId,
                UserId: req.user.id,
            }
        })
        if(!post){
            return res.status(403).send('게시글을 삭제할수 없습니다.');
        }
        res.status(201).json({PostId:Number(req.params.postId)});
    }catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;