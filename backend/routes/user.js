const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {User,Post} = require('../models'); //모델  models/index 에서 가져오기 
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('../passport/middlewares');

router.get('/followings', isLoggedIn, async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{id: req.user.id}
        });
        if(!user){
            return res.status(403).send('로그인해 주세요');
        }
        const followings = await user.getFollowings();
        res.status(200).json(followings);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/followers', isLoggedIn, async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{id: req.user.id}
        });
        if(!user){
            return res.status(403).send('로그인해 주세요');
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers);
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.patch('/:userId/follow', isLoggedIn, async(req,res,next)=>{
    try{
        const user =await User.findOne({
            where:{id: req.params.userId}
        });
        if(!user){
            return res.status(403).send('없는 유저입니다.');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({UserId: Number(req.params.userId)});
    }catch(err){
        console.error(err);
        next(err);
    }
})


router.delete('/:userId/follow', isLoggedIn, async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{id: req.params.userId}
        });
        if(!user){
            return res.status(403).send('없는 유저입니다.');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({UserId: Number(req.params.userId)});
    }catch(err){
        console.error(err);
        next(err);
    }
})

router.patch('/nickname',isLoggedIn, async(req,res,next)=>{
    try{
        await User.update({
            nickname:req.body.nickname,
        },{
            where:{
                id:req.user.id,
            }
        });

        res.status(200).json({nickname:req.body.nickname});
    }catch(err){
        console.error(err);
        next(err);
    }
})

router.get('/', async(req,res,next)=>{
    try{
        if(req.user){
        const fullUserWithoutPassword = await User.findOne({
            where:{
                id:req.user.id,
            },
            attributes:{
                exclude:['password'],
            },
            include:[{
                model:Post,
                attributes:['id'],
            },
            {
               model:User,
               as:'Followings', 
               attributes:['id'],
            },{
                model:User,
                as:"Followers",
                attributes:['id'],
            }]
        });
        console.log('로그인',fullUserWithoutPassword.dataValues);
        res.status(200).json(fullUserWithoutPassword);
        }else{
            res.status(200).json(null);
        }

    }catch(error){
        console.error(error);
        next(error);
    }
})

router.post('/login', isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.log(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason); // 로그인 문제 생겻을때 보통 401로 접속.
        }
        return req.login(user, async(loginErr)=>{
            if(loginErr){
                console.log(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where:{id:user.id},
                attributes:{
                    exclude: ['password']
                },
                include:[{
                    model:Post,
                    attributes:['id'],
                },{
                    model:User,
                    as:'Followings',
                    attributes:['id'],
                },{
                    model:User,
                    as:'Followers',
                    attributes:['id'],
                }
                ]
            })

            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req,res,next);
});

router.post('/',isNotLoggedIn, async (req, res, next)=>{
    try{ 
        // 중복된 이메일이 있는지 검사.
    const exitUser = await User.findOne({ //시퀄라이저.js 레코드 조회방법중 하나  비동기 이다.
        where: { 
            email:req.body.email,
        }
    })
    if(exitUser){ // 이메일이 중복이라면.
        return res.status(403).send('이미 사용 중인 아이디입니다.'); // 실패  상태코드 status 403 보통 클라이언트에서 실패일때 403
    }
    // bcrypt 라이브러리로 비밀번호 암호화 해주기 2번째 params 는 숫자가 높을수록 보안이 강력해진다 숫자가 높을수록 암호화하는데 시간이 오래걸림.
    const hashedPassword = await bcrypt.hash(req.body.password, 12); 
    await User.create({  //  서버에서 회원가입 data 보내주고 그 data 를 통해서 User 테이블에 새로운 유저 생성
        email: req.body.email,  // data:{email:"dd@dd",nickname:"ddd",password:"qwer"} => req.body 이렇게 표현이됨.
        nickname: req.body.nickname,
        password: hashedPassword,
    })
    res.status(200).json('ok'); // 성공상태 200
    }catch (error){
        console.log(error);
        next(error); // 에러가 생기면 express 에서 알아서  에러를 한방에 넘겨준다. status:500
    }
});


router.post('/logout', isLoggedIn, (req, res, next)=>{
    req.logOut();
    req.session.destroy();
    res.status(201).send('ok');
})

module.exports = router;