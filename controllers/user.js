const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcrypt');

const update = async (req,res)=>{
    console.log(req.body.userId, req.params.id );
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(StatusCodes.OK).json("Account has been updated");
        }catch(error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }else{
        res.status(StatusCodes.FORBIDDEN).json('You can only update your account!');
    }
}

module.exports = {update};