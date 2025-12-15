import type { Request, Response } from "express";
import { ProjectService } from "../services/projects.service.ts";
import { AuthService } from "../services/auth.service.ts";
export class ProjectsController {
  private service = new ProjectService();
  private userService = new AuthService();
  createProject = async (req: Request, res: Response) => {
    try {
      const email = await this.userService.findEmailByJwt(req.cookies["jwt"]);
      const user: User = await this.userService.getUserByEmail(
        email.toString(),
      );
      const content: string = req.body.content;
      const name: string = req.body.name;
      const project = await this.service.createProject(name, content, user);
      res.status(201).json(project);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  getProjects = async (req: Request, res: Response) => {
    try {
      const projects = await this.service.getProjects();
      res.status(200).json(projects);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
