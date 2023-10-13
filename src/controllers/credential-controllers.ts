import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from '../middlewares/validate-middleware';
import { credentialService } from "../services/index";

async function create(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { title, url, username, password } = req.body;
    const credential = await credentialService.create(userId, title, url, username, password);
    res.status(httpStatus.CREATED).send(credential);
}

async function getAll(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const credentials = await credentialService.getAll(userId);
    res.status(httpStatus.OK).send(credentials);
}
async function getById(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { id } = req.params;
    const credentialId = Number(id);
    const credential = await credentialService.getById(userId, credentialId);
    res.status(httpStatus.OK).send(credential);
}

async function deleteCredential(req: AuthenticatedRequest, res: Response){
    const { userId } = req;
    const { id } = req.params;
    const credentialId = Number(id);

    await credentialService.deleteCredential(userId, credentialId);
    res.sendStatus(httpStatus.OK);

}

export const credentialController = {
    create,
    getAll,
    getById,
    deleteCredential
}