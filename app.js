require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const morgan = require('morgan');
const app = express();


const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const {swaggerServe,swaggerSetup} = require('./config');

app.use('/api-docs',swaggerServe,swaggerSetup);
app.use(express.json());
app.use(morgan('common'));

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

app.get('/', (req, res) => {
    res.send("Social Media App API Loading");
});

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/posts',postRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

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