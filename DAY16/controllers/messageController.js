//get message and send message
import { createStandardJSONSchemaMethod } from "zod/v4/core";
import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js"

export const getMessage = async(req,res)=>{

    try{

        const {chatId} = req.params;

        //now verify whether this chat belongs to this user only ....

        const chat = await Chat.findOne({
            _id:chatId,
            userId: req.user._id
            
        });

        if(!chat){
            return res.status(404).json({
                message:"Chat not found"
            })

        }


       const messages = await  Message.find({

        chatId:chatId

        }).sort({createdAt:1})

        res.status(200).json({
            message:"Your all messages are here",
            msg: messages

        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error"
        })

    }

}


export const sendMessage = async(req,res)=>{


     try{

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error"
        })

    }

}

