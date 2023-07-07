const express = require("express");
const router = express.Router();
const salesProductController = require("../controllers/SalesProductController");

router.post("", salesProductController.store);
router.get("", salesProductController.list);

module.exports = router;