import { validateBody } from "@/middlewares";
import { signUpSchema } from "@/schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-in', validateBody(signUpSchema))
authRouter.post('/sign-up', validateBody(signUpSchema))

export { authRouter }