import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/jwtService";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized("No token provided"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const { id, role } = await JwtService.verify(token);
    const user = { id, role };
    req.user = user;
    console.log('user');
    console.log(user);
    next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized("Invalid token"));
  }
};

export default auth;
