const express = require('express');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models'); // models/index.js 에서 db 가져오기.
db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공');
    })
    .catch(console.error);

app.use(express.json()); //프론트에서 받은 데이터가 json 형태이먄 json 데이터를 req.body 에 넣어준다.
app.use(express.urlencoded({extended: true})); // 프론트에서 받은 데이터가 form형식 데이터 일때  폼데이터를 req.body 에 넣어준다.

app.use('/post',postRouter);
app.use('/user',userRouter);

app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`);
})
