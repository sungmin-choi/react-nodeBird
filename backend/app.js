const express = require('express');
const cors = require('cors');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models'); // models/index.js 에서 db 가져오기.
const passportConfig = require('./passport');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');


dotenv.config();
db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공');
    })
    .catch(console.error);

passportConfig();

app.use(cors({  // cors 문제 해결 npm i cors  
    origin: 'http://localhost:3060', // *: 모든도메인 허용
    credentials: true, // 쿠키를 프런트와 주고 받기 위해
}
))


app.use(express.json()); //프론트에서 받은 데이터가 json 형태이먄 json 데이터를 req.body 에 넣어준다.
app.use(express.urlencoded({extended: true})); // 프론트에서 받은 데이터가 form형식 데이터 일때  폼데이터를 req.body 에 넣어준다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret:process.env.COOKIE_SECRET,
}));
app.use(passport.initialize()); // 패스포트 설정 미들웨어에 추가.
app.use(passport.session());


app.use('/post',postRouter);
app.use('/user',userRouter);


app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`);
})
