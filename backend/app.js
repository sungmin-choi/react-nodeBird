const express = require('express');
const app = express();
const port = 3065;


app.post('/api/post', (req,res)=> {
    res.json({
        id:1, content:'hello',
    })
})

app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`);
})
