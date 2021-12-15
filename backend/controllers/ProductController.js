import Joi from "joi";
import path from "path";
import multer from "multer";
import CustomErrorHandler from "../services/CustomErrorHandler";
import fs from "fs";
// import {Product} from products
import Product from "../models/products";
import productSchema from "../validators/productsValidator";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${Math.round(
      Math.round() * 1E9
    )}.${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const handleMultiPartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const productController = {
  async store(req, res, next) {
    try {
      handleMultiPartData(req, res, async (err) => {
        if (err) {
          console.log("dg");
          console.log(err);
          return next(CustomErrorHandler.serverError());
        }
        // console.log(`req.file` + req.file);
        if (req.file) {
          const filePath = req.file.path;
        }
        const { error } = productSchema.validate(req.body);
        if (error) {
          console.log("dg1");
          //delete image from file
          if (req.file) {
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
              // console.log("dg4");
              console.log(err);
              if (err) {
                return next(CustomErrorHandler.serverError(err));
              }
            });
          }
          // console.log("dg3");
          console.log(error);
          return next(error);
        }

        const { name, price, size } = req.body;
        let document;
        try {
          document = await Product.create({
            name,
            price,
            size,
            ...(req.file && {
              image: filePath,
            }),
          });
        } catch (err) {
          return next(err);
        }
        res.status(201).json({ document });
      });
    } catch (err) {
      console.log("dg2");
      throw next(err);
    }
  },

  update(req, res, next) {
    try {
      handleMultiPartData(req, res, async (err) => {
        if (err) {
          console.log("dg");
          console.log(err);
          return next(CustomErrorHandler.serverError());
        }
        // console.log(`req.file` + req.file);
        if (req.file) {
          const filePath = req.file.path;
        }

        const { error } = productSchema.validate(req.body);
        if (error) {
          console.log("dg1");
          //delete image from file
          if (req.file) {
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
              // console.log("dg4");
              console.log(err);
              if (err) {
                return next(CustomErrorHandler.serverError(err));
              }
            });
          }
          // console.log("dg3");
          console.log(error);
          return next(error);
        }

        const { name, price, size } = req.body;
        let document;
        try {
          document = await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
              name,
              price,
              size,
              ...(req.file && {
                image: filePath,
              }),
            },
            { new: true }
          );
          console.log(document);
        } catch (err) {
          return next(err);
        }
        res.status(201).json({ document });
      });
    } catch (err) {
      console.log("dg2");
      throw next(err);
    }
  },
};

export default productController;
