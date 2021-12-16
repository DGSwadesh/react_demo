import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

import {
  refreshController,
  registerController,
  loginController,
  userController,
  productController,
} from "../controllers";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refreshToken", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

router.get("/products", productController.index);
router.get("/products/:id", productController.show);
router.post("/products", auth, admin, productController.store);
router.put("/products/:id", auth, admin, productController.update);
router.delete("/products/:id", auth, admin, productController.delete);

export default router;
