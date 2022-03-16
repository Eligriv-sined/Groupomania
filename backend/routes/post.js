const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", postCtrl.getAll);
router.post("/", auth, multer, postCtrl.create);
router.post("/byAuthor",postCtrl.getByauteur);
router.delete("/:id",postCtrl.suprimer);
router.put("/:id", multer, postCtrl.modif);

module.exports = router;