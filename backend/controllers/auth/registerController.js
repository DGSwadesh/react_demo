import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JwtService from "../../services/jwtService";

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

    // hash password
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
    //prepare the model
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password: hashedPassword,
    };
    let access_token;
    try {
      const result = await User.save();
      console.log(result);
      // token
      access_token = JwtService.sign({ id: result.id, role: result.role });
    } catch (err) {
      return next(err);
    }

    res.json({ access_token: access_token });
  },
};

export default registerController;
