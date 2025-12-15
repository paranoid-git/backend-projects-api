import { ProjectRepository } from "../repositories/project.repository.ts";
import type { Project, User } from "@prisma/client";

export class ProjectService {
  private repo = new ProjectRepository();

  createProject = async (
    name: string,
    content: string,
    author: User,
  ): Promise<Project> => {
    return this.repo.create(name, content, author.id);
  };

  getProjects = async (): Promise<Project[]> => {
    return this.repo.getProjects();
  };
}
