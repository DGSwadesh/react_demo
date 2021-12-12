
import User from "../../models/user";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({ id: req.user._id }).select('-password -updatedAt -__v');
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.json(user );
    } catch (err) {
      throw next(err);
    }
  },
};

export default userController;
