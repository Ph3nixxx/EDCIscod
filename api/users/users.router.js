const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware, usersController.getAll);
router.get("/:id", authMiddleware, usersController.getById);
router.post("/", authMiddleware, usersController.create);
router.put("/:id", authMiddleware, usersController.update);
router.delete("/:id", authMiddleware, usersController.delete);

router.get("/:userId/articles", usersController.getArticlesForOneUser)

module.exports = router;