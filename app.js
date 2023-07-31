require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const app = express();

app.get('/', (req, res) => {
    res.send("Social Media App API Loading");
});

const PORT = process.env.PORT || 2001;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}

start();