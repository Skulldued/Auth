import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
import { errorHandler } from "../utils/Error.js";
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
