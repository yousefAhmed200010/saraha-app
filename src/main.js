import express from "express";
import authController from "./module/auth/Auth.controller.js";
import productcontroller from "./module/product/product.controller.js";
import globalerrmiddleware from "./middleware/error.middleware.js";
import notfoundmiddleware from "./middleware/notfound.middleware.js";
import { PORT } from "./config/config.js";
import { dbConnection } from "./DB/model/connection.db.js";

const app = express();

await dbConnection();
const port = Number(process.env.PORT||3000);

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authController);
app.use("/product",productcontroller);

// Error handling middleware (must be last)
app.use(notfoundmiddleware);
app.use(globalerrmiddleware);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});