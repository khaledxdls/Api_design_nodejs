import { Router } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { validateinput } from "./middleware";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdates, getOneUpdate, getUpdates, updateUpdates } from "./handlers/update";
const router = Router();

router.get("/product", getProducts);
  
router.get("/product/:id", getOneProduct);
  
router.post("/product",body("name").isString() ,validateinput, createProduct);
  
router.put("/product/:id",body("name").isString() ,validateinput, updateProduct);
router.delete("/product/:id", deleteProduct);
/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.post("/update",body("title").exists().isString(), body("body").exists().isString(),body("productId").exists().isString(), createUpdate);

router.put("/update/:id",body("title").optional().isString(), body("body").optional().isString(),oneOf([check('status').equals('IN_PROGRESS'), check('status').equals('SHIPPED'), check('status').equals('DEPRECATED')]),body("version").optional().isString(), updateUpdates);

router.delete("/update/:id", deleteUpdates);

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint",body("name").exists().isString(),body("description").exists().isString(), (req, res) => {});

router.put("/updatepoint/:id",body("name").optional().isString(),body("description").optional().isString(), (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;