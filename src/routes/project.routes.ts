import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { ProjectsController } from "../controllers/projects.controller.ts";

const router = Router();
const controller = new ProjectsController();
router.get("/getProjects", controller.getProjects);
router.get("/:id", controller.searchId);
router.post("/createProject", authenticate, controller.createProject);
export default router;
