import { UserRepository } from "../repositories/user.repository.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AuthService {
  private userRepo = new UserRepository();
  async register(email: string, username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.userRepo.create({ email, name: username, password: hashed });
  }
  async getUser(userId: string) {
    return this.userRepo.findById(userId);
  }
  async getUserByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }
  async findEmailByJwt(token: string) {
    try {
      const payload = await jwt.verify(token, "secret");
      return payload.email;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async login(email: string, password: string) {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) return null;
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;

      //add jwt storing
      const token = jwt.sign({ email: email, password: password }, "secret", {
        expiresIn: "1h",
      });

      return { user, token };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
