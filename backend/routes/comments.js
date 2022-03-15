const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/",auth, commentCtrl.create);
router.get("/", commentCtrl.getAll);
router.delete("/:commentId/:postId", auth, commentCtrl.suprimer);


module.exports = router;