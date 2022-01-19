const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Post, User, Comment, Image} = require('../models');

router.get('/',async(req,res,next)=>{
    try{
        console.log("id:%%%%%%%%%%%%%%%%",Number(req.query.lastId));
        const where ={};
        if(Number(req.query.lastId)){
            where.id={[Op.lt]:Number(req.query.lastId)}
            
        }
        const posts = await Post.findAll({
            where,
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
            },
            {
                model:Post,
                as: 'Retweet',
                include:[{
                    model: User,
                    atrribute:['id','nickname'],
                },{
                    model:Image,
                }],
            }
        ]
        })

        res.status(201).json(posts);
    }catch(error){
        console.error(error);
        next(error);
    }
})



module.exports=router;