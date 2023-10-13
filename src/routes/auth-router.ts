import { authController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signUpSchema } from "@/schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-in', validateBody(signUpSchema), authController.signIn)
authRouter.post('/sign-up', validateBody(signUpSchema), authController.signUp)

export { authRouter }