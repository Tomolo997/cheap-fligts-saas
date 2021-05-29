const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
//not protected routes
router.post("/signup", authController.singUp);
router.post("/login", authController.logIn);
router.get("/loggedIn", authController.isLoggedIn);
router.get("/logout", authController.logout);

//protected routes
router.get("/getMe", authController.protect, userController.getMe);
router.get("/airports", authController.protect, userController.getAirports);
router.put("/updateMe", authController.protect, userController.updateMe);

module.exports = router;
