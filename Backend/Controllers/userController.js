import pool from "../Models/database.js";
import {hash} from "bcrypt";

export const userSignup = async(req,res,next)=>{
    try {
        //need to add the phonenumber into the database
        const {name,email,password,confirmPassword,postalCode} = req.body;
        if(password !== confirmPassword)
            return res.status(422).json({message:"Passwords do not match"});

        const sql = "select * from user where name = ? and email = ?";
        pool.query(sql,[name,email],async(err,result)=>{
            if(err)
                return res.status(422).json({message:err.message,data:"Unauthorized Access"});
            if(result.length !== 0)
                return res.status(404).json({message:"User already exists Do login"});

            const hashedPassword = await hash(password,10);

            const insertsql = "INSERT INTO user (name, email, password, locality_id,role) VALUES (?, ?, ?, ?, ?)";
        
            pool.query(insertsql,[name,email,hashedPassword,postalCode,'user'],(in_err,in_result)=>{
                if(in_err)
                    return res.status(500).json({message:in_err.message,data:"Internal Server Error"});
                else{
                    //need to implement the token authorization and cookie expiry...
        
                    return res.status(200).json({message:"Success",data:in_result})
                }
            });
        });
    } catch (error) {
        return res.status(500).json({message:error.message,data:"Internal Server Error"});   
    }
}