import { Router } from "express";
import * as z from "zod";
import { BadRequestException } from "../../common/exceptions/app.exeption.js";
import { successResponse } from "../../common/responses/success.response.js";
import { login, signup } from "./Auth.service.js";


const authRouter = Router();
authRouter.post("/signup", async (req, res) => {

  const result = await signup(req.body);
  successResponse(res, 201, "created", result);
});

authRouter.post("/login", async (req, res) => {

  const getProfileSchema = z.object({
    email: z.email(),
    password: z.string(),
    phone: z.e164(),
    age:z.coarce.number().int().min(18).max(100),
    test:z.literal("test")
  });
  const validateData = getProfileSchema.safeParse(req.body);
  
  if (!validateData.success) {
  throw BadRequestException({errMsg:"validation failed",cause:{issues:validateData.error.issues}})
  
  }
  req.validateData = validateData.data;
  console.log({ validateData })
  

  const result = await login(req.validateData);
  successResponse(res, 200, "success", result);
});

export default authRouter;