const express = require('express');
const router = express.Router();
const {Post, Comment, Image, User, Hashtag} = require('../models');
const {isLoggedIn} = require('../passport/middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

try{
    fs.accessSync('uploads');
}catch(err){
    console.log('업로드 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
}

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
const upload = multer({ // multipart 형식이 매번 다르기 때문에 이렇게 변형해주는 작업이 필요하다.
    storage: multer.diskStorage({ // 테스트 할때는 로컬 하드디스크에 사진저장해서 테스트를 한다.
        destination(req, file, done){ // 저장위치
            done(null, 'uploads'); // uploads 폴더에 저장.
        },
        filename(req, file, done){ // 파일정보. apple.png
            const ext = path.extname(file.originalname); // 확장자 추출 (.png)
            const basename = path.basename(file.originalname, ext) //apple
            done(null, basename+ new Date().getTime() + ext); // 동일 이름 방지를 위해서 업로드 시간까지 이름에 추가.
        }
    }),
    limits: {fileSize: 20* 1024* 1024} //20MB
})

router.post('/',isLoggedIn, upload.none(),async(req, res, next)=>{
    try{
        
        const post=await Post.create({ //데이터베이스에 잘 저장이 됩니다.
            content:req.body.content,
            UserId: req.user.id,
            });
        const hashtags = req.body.content.match(/#[^\s#]+/g); 
        if(hashtags){
            const result = await Promise.all(hashtags.map((hashtag)=>Hashtag.findOrCreate({
                where:{name: hashtag},
            }))) // [[해시태그, true],[다른해시, true]]
            await post.addHashtags(result.map((e)=>e[0]));
        }
        
        if(req.body.image){
            if(Array.isArray(req.body.image)){ // 이미지 여러개 올리면 배열로 받는다.
                const images = await Promise.all(req.body.image.map((image)=> Image.create({src: image}))); //한번에 DB에 저장한다.
                await post.addImages(images);
            }else{
                const image = await Image.create({src:req.body.image});
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
           where:{id:post.id},
           include:[{
            model:Image,
           },{
            model:Comment,
           },{
            model:User,
            attributes:['id','nickname'],
           },{
            model:User,
            as:'Likers',
           }
            ] 
        })
        console.log('fullPost:',fullPost);
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

router.post('/:postId/retweet',isLoggedIn, async(req, res, next)=>{
    try{
        console.log('여기!!!!1');
        const post = await Post.findOne({ 
            where:{
                id:req.params.postId,
            },
            include: [{
                model:Post,
                as: 'Retweet',
            }]
        })
        
        if(!post){
            return res.status(401).send('존재하지 않는 포스트입니다.');
        }
        console.log('post:',post);
        if(req.user.id === post.UserId  || (post.Retweet && post.Retweet.UserId === req.user.id)){
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
        }

        const retweetTargetId = post.Retweet || post.id;

        const exPost = await Post.findOne({
            where:{
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            },
        })
        if(exPost){
            return res.status(403).send('이미 리트윗 했습니다.');
        }
        console.log('expost:',exPost);
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        })
        const retweetWithPrevPost = await Post.findOne({
            where:{
                id:retweet.id,
            },
            include:[{
                model:Post,
                as: 'Retweet',
                include:[{
                    model: User,
                    atrribute:['id','nickname'],
                },{
                    model:Image,
                }]
            },{
                model: User,
                atrribute:['id','nickname'],
            },{
                model:Image,
            },{
                model:User,
                as: 'Likers',
            },{
                model: Comment,
                include:[
                    {
                        model: User,
                        atrribute:['id','nickname'],
                    }
                ]
            }]
        })
        console.log('retweetWithPrevPost:',retweetWithPrevPost);
        res.status(201).json(retweetWithPrevPost);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/images',isLoggedIn, upload.array('image') ,async(req,res,next)=>{
    try{
        console.log(req.files); // 파일리스트 보기
        res.json(req.files.map((file)=>file.filename)); // 각 파일들의 이름들을 프론트로 전달해주기.
    }catch(err){
        console.error(err);
        next(err);
    }
})


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