const express = require('express');
const router = express.Router();
const {Post, User, Comment, Image} = require('../models');

router.get('/',async(req,res,next)=>{
    try{
        const posts = await Post.findAll({
            limit:10,
            order:[['createdAt','DESC'],
                    [Comment,'createdAt', 'DESC']],
            include:[{
                model:User,
                atrribute:['id','nickname'],
            },{
                model: Image,
            },{
                model:Comment,
                include:[
                    {
                        model:User,
                        atrribute:['id','nickname'],
                    }
                ]
            },{
                model:User,
                as:'Likers',
                atrribute:['id'],
            }]
        })

        res.status(201).json(posts);
    }catch(error){
        console.error(error);
        next(error);
    }
})



module.exports=router;