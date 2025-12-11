import dotenv from "dotenv";
import app from "./app";
import { connectDatabase } from "./infra/database/connection";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
      console.log(` API: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
