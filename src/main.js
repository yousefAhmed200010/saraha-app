import express from "express";
import { PORT } from "./config/config.js";
import { dbConnection } from "./DB/model/connection.db.js";
import globalmiddleware from "./middleware/error.middleware.js";
import notfoundmiddleware from "./middleware/notfound.middleware.js";
import { default as authController, default as userController } from "./module/auth/Auth.controller.js";

const app = express();

await dbConnection();
const port = Number(process.env.PORT || 3000);

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authController);
app.use("/user", userController);


// Error handling middleware (must be last)
app.use(notfoundmiddleware);
app.use(globalmiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});