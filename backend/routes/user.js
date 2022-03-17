const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const authTokenId = require("../middleware/auth");
const validEmail = require("../middleware/email");
const multer = require("../middleware/multer-config");

router.get("/",userCtrl.getAll);
router.delete("/delete/:id", userCtrl.suprimer);
router.post("/signup", validEmail, multer, userCtrl.inscription);
router.post("/login", userCtrl.connexion);
router.put("/modify/:id", authTokenId, multer, userCtrl.modifPP);
router.put("/modifyAccount/:id", authTokenId, userCtrl.modifAccount);
router.put("/modifyPassword/:id", authTokenId, userCtrl.modifPassword);
router.get("/", userCtrl.getOne);


module.exports = router;