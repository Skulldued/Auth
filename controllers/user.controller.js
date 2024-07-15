import { errorHandler } from "../utils/Error.js";
import bcryptjs from "bcrypt";  
import User from "../models/user.model.js";
export const test = (req,res)=>{
    res.send("Routes sunny by controllers");
}

//update user
export  const  updateUser = async(req,res,next)=>{
  if(req.user.id !== req.params.id){
    return next(errorHandler(401,"You can only update your account"));
  }

  try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }
    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture
            }
        },
        {new:true} //It is use to update the old user if we can not write this then the user is not updated
  );
  const {password,...rest} = updateUser._doc;
  res.status(200).json(rest);
  } catch (error) {
    
  }
}

