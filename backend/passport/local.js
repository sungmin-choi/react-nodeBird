const passport = require('passport');
const {User} = require('../models');
const bcrypt = require('bcrypt');
const {Strategy: LocalStrategy} = require('passport-local');


module.exports =()=>{
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done)=>{
        try{
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(!user){
           return done(null, false, {reason:'존재하지 않는 사용자입니다.'});// done(서버에러,성공유무,클라이언트에러)
        }
        const result = await bcrypt.compare(password,user.password) // 해쉬암호화된 비밀번호가 일치한지 비교한다.
        if(result){
            return done(null, user);
        }
        return done(null, false, {reason:'비밀번호가 틀렸습니다'});
        }catch(error){
            console.log(error);
            return done(error);
        }
    }));
};