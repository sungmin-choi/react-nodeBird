const express = require('express');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');


app.use('/post',postRouter);

app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`);
})
