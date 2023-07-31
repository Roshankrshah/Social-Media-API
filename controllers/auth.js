const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcrypt');

const register = async (req,res)=>{

    const {password, username,email} = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword
        });

        const user = await newUser.save();
        res.status(StatusCodes.CREATED).json(user);
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const login = async (req,res)=>{
    const {email,password} = req.body;
    
    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(StatusCodes.NOT_FOUND).json('User not found');
        }

        const validPassword = await bcrypt.compare(password,user.password);

        if(!validPassword)
            res.status(StatusCodes.FORBIDDEN).json("wrong password");

        res.status(StatusCodes.OK).json(user);
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = {register,login};
