import { validateBody, validateToken } from "@/middlewares";
import { credentialSchema } from "@/schema";
import { Router } from "express";

const credentialRouter = Router();

credentialRouter.all('/*', validateToken)
.post('/create', validateBody(credentialSchema))
.get('/:id')
.delete('/:id')

export { credentialRouter }