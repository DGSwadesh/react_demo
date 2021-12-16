import Joi from "joi";
import path from "path";
import multer from "multer";
import CustomErrorHandler from "../services/CustomErrorHandler";
import fs from "fs";
import Product from "../models/products";
import productSchema from "../validators/productsValidator";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${Math.round(
      Math.round() * 1e9
    )}.${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const handleMultiPartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const productController = {
  async index(req, res, next) {
    let document;
    try {
      // console.log(req.params.id);
      document = await Product.find()
        .select("-__v -updatedAt -createdAt")
        .sort({ _id: -1 });
      if (!document) {
        return next(new Error("nothing to delete"));
      }

      res.json(document);
    } catch (err) {
      // console.log("dg2");
      console.log(err);
      return next(CustomErrorHandler.serverError());
    }
  },
  async show(req, res, next) {
    let document;
    try {
      console.log(req.params.id);
      document = await Product.findOne({ _id: req.params.id })
        .select("-__v -updatedAt -createdAt")
        .sort({ _id: -1 });
      if (!document) {
        return next(new Error("No Product Found"));
      }

      res.json(document);
    } catch (err) {
      console.log(err);
      return next(CustomErrorHandler.serverError());
    }
  },
  async store(req, res, next) {
    try {
      handleMultiPartData(req, res, async (err) => {
        if (err) {
          console.log(err);
          return next(CustomErrorHandler.serverError());
        }
        // console.log(`req.file` + req.file);
        let filePath;
        if (req.file) {
          filePath = req.file.path;
        }
        const { error } = productSchema.validate(req.body);
        if (error) {
          // console.log("dg1");
          //delete image from file
          if (filePath) {
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
          // console.log('dg2');
          document = await Product.create({
            name,
            price,
            size,
            ...(filePath && {
              image: filePath,
            }),
          });
          console.log(document);
        } catch (err) {
          console.log(err);
          return next(err);
        }
        res.status(201).json({ document });
      });
    } catch (err) {
      // console.log("dg22");
      console.log(err);
      throw next(err);
    }
  },

  update(req, res, next) {
    try {
      handleMultiPartData(req, res, async (err) => {
        if (err) {
          // console.log("dg");
          console.log(err);
          return next(CustomErrorHandler.serverError());
        }
        // console.log(`req.file` + req.file);
        let filePath;
        if (req.file) {
          filePath = req.file.path;
        }

        const { error } = productSchema.validate(req.body);
        if (error) {
          // console.log("dg1");
          //delete image from file
          if (filePath) {
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
              ...(filePath && {
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

  async delete(req, res, next) {
    try {
      console.log(req.params.id);
      const document = await Product.findOneAndRemove({ _id: req.params.id });
      if (!document) {
        return next(new Error("nothing to delete"));
      }
      // console.log(err);
      // image delete
      const filePath = document._doc.image;
      if (filePath) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          console.log("dg4");
          console.log(err);
          if (err) {
            console.log("dg5");
            console.log(err);
            return next(CustomErrorHandler.serverError());
          }
        });
      }
      res.json(document);
    } catch (err) {
      console.log("dg2");
      console.log(err.message);
      throw next(err);
    }
  },
};

export default productController;
