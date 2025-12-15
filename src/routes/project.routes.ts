import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { ProjectsController } from "../controllers/projects.controller.ts";

const router = Router();
const controller = new ProjectsController();
router.use(authenticate);
router.post("/createProject", authenticate, controller.createProject);
router.get("/getProjects", authenticate, controller.getProjects);

export default router;
