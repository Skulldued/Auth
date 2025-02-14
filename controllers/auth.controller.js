import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/Error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  //when we save the data it depends on your internet connect if your internet connect is slow then it exexute to next line to prevents this issue we use await here means jab tak data new user ka save nhi ho jata ye aage nahi jayega
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    next(error);

    // Custom Error Call
    // next(errorHandler(300,"Someting Went Wrong"));
  }
};





//signIn

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const validUser = await User.findOne({ email });
    console.log("checking user by find", validUser);
    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    console.log("After bcrypting password", validPassword);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const {password:hashedPassword,...rest} = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1hours
    res.cookie('access_token',token,{httpOnly:true , expires:expiryDate}).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};







//Google login

export const google = async(req,res,next)=>{
  try {
      const user = await User.findOne({email:req.body.email});
      if(user){
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
         const {password:hashedPassword ,...rest} = user._doc;
         const expiryDate = new Date(Date.now() + 3600000); //1hours
         res.cookie('access_token', token,{
          httpOnly:true,
          expires:expiryDate,
         }).status(200).json(rest);
      }else{
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
          const newUser = new User({
            username:req.body.name.split(" ").join("").toLowerCase() +   Math.random().toString(36).slice(-8),
            email:req.body.email,
            password:hashedPassword,
            profilePicture:req.body.photo
          });
          await newUser.save();
          const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
          const {password:hashedPassword2,...rest}=newUser._doc;
          const expiryDate = new Date(Date.now() + 3600000); // 1hrs
          res.cookie('access_token',token,{
            httpOnly:true,
            expires:expiryDate,
          }).status(200).json(rest);
      }
  } catch (error) {
      next(error);
  }
}


//signout function
export const signout = (req,res)=>{
  res.clearCookie('access_token').status(200).json("signout success !!");
}
