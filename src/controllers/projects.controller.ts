import type { Request, Response } from "express";
import { ProjectService } from "../services/projects.service.ts";
import { AuthService } from "../services/auth.service.ts";
import { info, error, debug } from "../utils/logger.ts";
import jwt from "jsonwebtoken";
export class ProjectsController {
  private service = new ProjectService();
  private userService = new AuthService();
  searchId = async (req: Request, res: Response) => {
    const project = await this.service.getProjectById(req, req.params.id);
    if (project === null) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.public === true) {
      res.status(200).json(project);
    } else {
      const email = await this.userService.findEmailByJwt(req.cookies["jwt"]);
      if (email === null || email === undefined) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const user = await this.userService.getUserByEmail(email);
      if (user.id === project.authorId) {
        res.status(200).json(project);
      }
    }
  };
  createProject = async (req: Request, res: Response) => {
    const email = await this.userService.findEmailByJwt(req.cookies?.jwt);
    const user: User = await this.userService.getUserByEmail(email.toString());
    const content: string = req.body.content;
    const name: string = req.body.name;
    const project = await this.service.createProject(name, content, user);
    res.status(201).json(project);
  };

  getProjects = async (req: Request, res: Response) => {
    const projects = await this.service.getProjects();

    let filteredProjects = projects.filter((p) => p.public);

    if (req.cookies.jwt) {
      const email = await this.userService.findEmailByJwt(req.cookies.jwt);
      const user = await this.userService.getUserByEmail(email);

      filteredProjects = filteredProjects.concat(
        projects.filter((p) => !p.public && p.authorId === user.id),
      );
    }

    res.status(200).json(filteredProjects);
  };
}
