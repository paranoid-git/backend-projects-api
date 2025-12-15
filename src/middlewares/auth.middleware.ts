// src/middlewares/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Extend the Request type to attach user info
interface AuthRequest extends Request {
  userId?: string; // will store the logged-in user's ID
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1️⃣ Get the token from Authorization header
    const auth = req.cookies["jwt"];
    // TODO: Extract token from header (e.g., "Bearer <token>")

    if (auth === "" || auth === undefined || auth === null) {
      res.status(401).json({ error: "Unauthorized" });
      // TODO: return 401 if no token
    }

    // 2️⃣ Verify token
    // TODO: Use your JWT verification utility
    // const payload = verifyToken(token)
    // 3️⃣ Attach user info to request
    // req.userId = payload.userId
    jwt.verify(auth, "secret", (err, user) => {
        // If there is an error, return an error
        if(err) return res.sendStatus(403);

        // If there is no error, continue the execution
        req.user = user;
        console.log(user);
        next();
    })
    // 4️⃣ Call next() to pass control to controller
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized" });
    // TODO: Return 401 if token is invalid or verification fails
  }
};
