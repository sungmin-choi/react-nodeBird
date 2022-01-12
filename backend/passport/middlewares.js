exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
    return res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    console.log(req.isAuthenticated());
    if(!req.isAuthenticated()){
        next();
    }else{
    res.status(401).send('이미 로그인 하셨습니다.')
    }
}