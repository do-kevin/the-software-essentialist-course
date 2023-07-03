import { Router } from "express";
import { UserController } from "src/controllers/user.controller";

const router = Router();

router.get("/users", UserController.getUsers);
router.get("/users", UserController.getUserByEmail);
router.post("/users/new", UserController.createUser);
router.post("/users/edit/:userId", UserController.editUser);

export { router };
