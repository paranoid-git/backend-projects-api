import { prisma } from "../lib/prisma.ts";
import type { User } from "@prisma/client";

export class UserRepository {
  async create(data: { email: string; password: string }): Promise<User> {
    return prisma.user.create({ data });
  }
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}
