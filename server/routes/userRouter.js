const express = require("express");
const { register, login, getCurrentUser } = require("../controller/userController");
const { validateSchemaFields } = require("../middleware/validation");
const { userValidationSchema } = require("../validationSchema/userValidation");
const checkAuth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", validateSchemaFields(userValidationSchema), register);

userRouter.post("/login", login);

userRouter.get("/current-user", checkAuth, getCurrentUser);

module.exports = userRouter;