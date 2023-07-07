const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");


router.get("", productController.list);
router.post("", productController.store);
router.get("/:id", productController.view);
router.put("", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
