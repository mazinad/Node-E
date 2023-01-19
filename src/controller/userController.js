import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

exports.registerUser = async (req, res) => {
    try {
       const user=await User.create(req.body);
       console.log("Users Fetched Are -->",user);
        const token = await user.generateAuthToken();
        res.status(201).json({
            message: 'User created successfully',
            status: 'success',
            token: token
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            status: 'failed'
        });
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(200).json({
            message: 'User logged in successfully',
            status: 'success',
            token: token,
            user: user
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            status: 'failed'
        });
    }
}
exports.logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).json({
            message: 'User logged out successfully',
            status: 'success'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: 'failed'
        });
    }
}
exports.logoutAllUser = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json({
            message: 'User logged out from all devices successfully',
            status: 'success'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: 'failed'
        });
    }
}
exports.getUser = async (req, res) => {
    try{
        await user.find().then((user)=>{
            res.status(200).json({
                message: 'User fetched successfully',
                status: 'success',
                user: user
            });
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
            status: 'failed'
        });
    }
}
exports.updateUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password
        }).then((user)=>{
            res.status(200).json({
                message: 'User updated successfully',
                status: 'success',
                user: user
            });
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
            status: 'failed'
        });
    }
}
exports.deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id).then((user)=>{
            res.status(200).json({
                message: 'User deleted successfully',
                status: 'success',
                user: user
            });
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
            status: 'failed'
        });
    }
}
exports.verify= async (req, res) => {
    try{
        const {token} = req.body;
        const id= jwt.verify(token, process.env.JWT_SECRET);
        const userExist = await User.findOne({_id: id});
        if(!userExist){
            res.status(400).json({
                message: 'User not found',
                status: 'failed'
            });
        }
        if(userExist.isVerified==true){
            res.status(400).json({
                message: 'User already verified',
                status: 'failed'
            });
        }
        const verifiedAccount = await User.updateOne({_id: id}, {isVerified: true});
        if(verifiedAccount){
            res.status(200).json({
                message: 'User verified successfully',
                status: 'success',
                verifiedAccount: verifiedAccount
            });
        }
    }catch(err){
        res.status(500).json({
            message: err.message,
            status: 'failed'
        });
    }
}
