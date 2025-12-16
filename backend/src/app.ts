import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./infra/http/routes/authRoutes";
import { errorHandler } from "./infra/http/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
});

app.use(errorHandler);

export default app;
