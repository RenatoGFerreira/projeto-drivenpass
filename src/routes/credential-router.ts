import { Router } from "express";

const credentialRouter = Router();

credentialRouter.all('/*').post('/').get('/:id').delete('/:id')

export { credentialRouter }