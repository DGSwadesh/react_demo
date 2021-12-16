import { User } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/jwtService";

const admin = async (req, res, next) => {
  try {
    // console.log('dg1');
    console.log(req.user)
    const user = await User.findOne({ _id: req.user.id });
    // console.log('dg2');
    // console.log(user)
    if (user.role == "customer") {
      next();
    } else {
      return next(CustomErrorHandler.unAuthorized("Invalid token"));
    }
  } catch (err) {
    // console.log('dg3');
    console.log(err);
    return next(CustomErrorHandler.serverError());
  }
};

export default admin;
