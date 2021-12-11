import express from "express";
// import registerController from "../controllers/auth/registerController";
// import loginController from "../controllers/auth/loginController";
// import userController from "../controllers/auth/userController";
import auth from "../middleware/auth";
import {
  refreshController,
  registerController,
  loginController,
  userController,
} from "../controllers";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refreshToken", refreshController.refresh);

export default router;
