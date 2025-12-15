import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";

export class AuthController {
  private service = new AuthService();

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.service.register(
        req.body.email,
        req.body.userName,
        req.body.password,
      );
      res.status(201).json({ id: user.name, email: user.email });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const { user, token } = await this.service.login(req.body.email, req.body.password);
      if (token === undefined) {
        return res.status(401).json({ error: "Invalid email or password" });
      } else {
        const jwt = token
        console.log({user, jwt});
      if (user === null) {
        return res.status(401).json({ error: "Invalid email or password" });
      } else {
        
        res.cookie("jwt", jwt, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        });

        res.status(200).json({
          email: user.email,
          userId: user.id,
          userName: user.name,
          createdAt: user.createdAt,
        });
      }

      }
          } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
