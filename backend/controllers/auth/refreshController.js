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
    console.log(req.body);
    const { error } = refreshSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    let refreshToken;
    // check if refresh_token already exists
    try {
      refreshToken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });
      if (!refreshToken) {
        return next(CustomErrorHandler.unAuthorized("Unauthorized"));
      }
      let userId;
      console.log("req.body3");
      console.log(refreshToken);
      try {
        const { id } = await JwtService.verify(
          refreshToken.token,
          REFRESH_SECRET
        );
        userId = id;
        console.log("_id", id);
      } catch (error) {
        console.log("2 message");
        console.log(err.message);
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }
      const user = await User.findById({ _id: userId });
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
      console.log("1st message");
      console.log(err.message);
      throw next(new Error("something went wrong" + err.message));
    }
  },
};

export default refreshController;
