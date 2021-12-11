import Joi from "joi";
import bcrypt from "bcrypt";
import JwtService from "../../services/jwtService";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";

const registerController = {
  async register(req, res, next) {
    // validate request body
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });
    console.log(req.body);
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // check if email already exists
    try {
      const exists = await User.exists({ email: req.body.email });
      if (exists) {
        return next(CustomErrorHandler.alreadyExists("Email already exists"));
      }
    } catch (err) {
      throw next(err);
    }

    const { name, email, password } = req.body;
    // hash password
    const hashedPassword = await bcrypt.hashSync(password, 10);
    //prepare the model
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    let access_token;
    let refresh_token;
    try {
      const result = await user.save();
      console.log(result);
      // token
      access_token = JwtService.sign({ id: result.id, role: result.role });
      refresh_token = JwtService.sign(
        { id: result.id, role: result.role },
        "1y",
        REFRESH_SECRET
      );
      // create refresh token
      await RefreshToken.create({ token: refresh_token });
    } catch (err) {
      return next(err);
    }

    res.json({ access_token, refresh_token });
  },
};

export default registerController;
