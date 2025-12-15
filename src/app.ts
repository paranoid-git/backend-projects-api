import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.ts";
import projectRoutes from "./routes/project.routes.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
// Global error handler
app.use(errorHandler);

export default app;
