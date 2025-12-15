import { prisma } from "../lib/prisma.ts";
import type { Project, User, ProjectContent } from "@prisma/client";

export class ProjectRepository {
  async create(
    name: string,
    content: string,
    authorId: string,
  ): Promise<Project> {
    console.log(name, content, authorId);
    return prisma.project.create({
      data: {
        name,
        content: { create: { content } }, // nested create
        authorId, // string id
      },
    });
  }

  async getProjects(): Promise<Project[]> {
    return prisma.project.findMany();
  }
}
