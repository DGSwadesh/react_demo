import Joi from "joi";
import JwtService from "../../services/jwtService";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";

const refreshController = {
  async refresh(req, res, next) {
    // validate request body
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });
    console.log('req.body');
    console.log(req.body);
    const { error } = refreshSchema.validate(req.body);
    if (error) {
      console.log('req.body1');
      return next(error);
    }

    // check if refresh_token already exists
    try {
      const refreshToken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });
      console.log('req.body2');
      if (!refreshToken) {
        console.log('req.body3');
        return next(CustomErrorHandler.unAuthorized("Unauthorized2"));
      }
      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshToken.token,
          REFRESH_SECRET
        );
        userId = _id;
        console.log(userId);
      } catch (error) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }
      const user = await User.findById({ id: userId });
      if (!user) {
        return next(CustomErrorHandler.unAuthorized("no user found"));
      }

      // generate new access token
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
      throw next(new Error("something went wrong" + err.message));
    }
  },
};

export default refreshController;
