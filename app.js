require('dotenv').config();
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Social Media App API Loading");
});

const PORT = process.env.PORT || 2001;
app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
});