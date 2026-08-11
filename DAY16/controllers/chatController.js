//getRecentChat, getSingleChat, createChat , deleteChat
import Chat from "../model/chatSchema.js"
import Message from "..model/messageSchema.js"



export const getRecentChat = async (req,res)=>{


    //req.user information is already available from middleware

    try{
         //this req.user came from middlewares, as it came for profile
       const chats = await  Chat.find({userId:req.user._id}).select("topic updatedAt").sort({updatedAt:-1}).limit(20);

       res.status(200).json({
        message:"Your all recent chats",
        chats
       })
        



    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal server error"
        })

    }





}




export const getSinglechat = async (req,res)=>{

     try{

        const {chatId} = req.params;

        const chat = await Chat.findOne(
            {
                _id:chatId,
                userId:req.user._id

            }
        )

        if(!chat){
          return  res.status(404).json({
                message:"You are not allowed to do this "
            })
        }

        res.status(200).json({
            chatId:chat._id,
            userId:chat.userId,
            topic: chat.topic,
            usage:chat.usage
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal server error"
        })

    }

}







export const createChat = async (req,res)=>{

     try{

        const{model} = req.body;  //user has selected which model...? 

        if(!model){
            res.status(400).json({
                message:"Model name is missing"
            })
        }


        //now create new chat 

        const chats = await Chat.create({
            userId: req.user._id,
            model,
        })

        res.status(201).json({
            chatId: chats._id,
            userId: req.user._id,
            model,
            topic: chats.topic,
            createdAt: chats.createdAt

        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal server error"
        })

    }

}


export const deleteChat = async (req,res)=>{

     try{

        const {chatId} = req.params;
         //user to authenticate ho gaya, but 
        //apni hi chat ko delete maarna hai, kisi aur ki nahi
        const chat = Chat.findOne({_id:chatId, userId:req.user._id}) //to pehle apni hi chat ko delete krna hai
           
          
          //the user is not allowed to delete the chats of others,
          if(!chat){
            return res.status(403).json({
                message:"You are not allowed to this!"
            })
          }

           //else if the user is authorized he can delete
           //delete the whole messages first
           await Message.deleteMany({
            chatId: chat._id
          })
           //delete the whole chats
          await Chat.deleteOne({
            _id:chatId
          })
          

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal server error"
        })

    }

}

