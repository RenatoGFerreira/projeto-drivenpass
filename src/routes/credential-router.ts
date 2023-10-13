import { credentialController } from "@/controllers";
import { validateBody, validateToken } from "@/middlewares";
import { credentialSchema } from "@/schema";
import { Router } from "express";

const credentialRouter = Router();

credentialRouter.all('/*', validateToken)
.post('/create', validateBody(credentialSchema), credentialController.create)
.get('/get', credentialController.getAll)
.get('/get/:id', credentialController.getById )
.delete('/delete/:id', credentialController.deleteCredential)

export { credentialRouter }