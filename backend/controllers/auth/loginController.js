import Joi from "joi";
import bcrypt from "bcrypt";
import JwtService from "../../services/jwtService";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import {REFRESH_SECRET} from "../../config";

const loginController = {
  async login(req, res, next) {
    // validate request body
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    console.log(req.body);
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // check if email already exists
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(
          CustomErrorHandler.wrongCradential("Email or Password may wrong")
        );
      }
      // comapare password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return next(
          CustomErrorHandler.wrongCradential("Email Or Password may wrong")
        );
      }
      // create token
      const access_token = JwtService.sign({
        id: user.id,
        role: user.role,
      });
      const refresh_token = JwtService.sign(
        { id: user.id, role: user.role },
        "1y",
        REFRESH_SECRET
      );
      // create refresh token
      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (err) {
      throw next(err);
    }
  },
};

export default loginController;
