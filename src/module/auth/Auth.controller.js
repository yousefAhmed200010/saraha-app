import { Router } from "express";
import { successResponse } from "../../common/responses/success.response.js";
import { login, signup } from "./Auth.service.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const result = await signup(req.body);
  successResponse(res, 201, "created", result);
});

authRouter.post("/login", async (req, res) => {
  const result = await login(req.body);
  successResponse(res, 200, "success", result);
});

export default authRouter;