import { Router } from "express";
import { successResponse } from "../../common/responses/success.response.js";
import { login, signup } from "./user.service.js";

const userRouter = Router();

userRouter.post("/get-profile", async (req, res) => {
  const result = await signup(req.body);
  successResponse(res, 201, "created", result);
});

userRouter.post("/login", async (req, res) => {
  const result = await login(req.body);
  successResponse(res, 200, "success", result);
});

export default userRouter;