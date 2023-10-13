import { NotFound, unauthorizedError } from "../errors/index";
import { Credential, NewCredential } from "../protocols";
import { credentialRepository, authRepository } from "../repositories/index"
import Cryptr from "cryptr";

const passwordHash = new Cryptr(process.env.CRYPTR, {encoding: 'base64', pbkdf2Iterations: Number(process.env.CRYPTR_ITERATIONS), saltLength: Number(process.env.CRYPTR_SALT)}
);

async function create(userId: number, title: string, url: string, username: string, password: string) {
    const user = await authRepository.verifyUserById(userId);
    if (!user) throw unauthorizedError();

    const credentialExist = await credentialRepository.findByTitle(title, userId);
    if (credentialExist) throw NotFound();

    const hash = passwordHash.encrypt(password);
    const credential: NewCredential = await credentialRepository.createCredentials(userId, title, url, username, hash);
    return credential;
}

async function getAll(userId: number) {
    const credentials = await credentialRepository.getAllCredentials(userId);
    let result = []
    
    for (let i = 0; i < credentials.length; i++) {
        let passwordEncrypt = credentials[i].password
        let passwordDecrypt = passwordHash.decrypt(passwordEncrypt)
        result.push(
            {
                id: credentials[i].id,
                title: credentials[i].title,
                url: credentials[i].url,
                userId: credentials[i].userId,
                username: credentials[i].username,
                password: passwordDecrypt
            })
    }
    return result;
}

async function getById(userId: number, credentialId: number) {
    const credential = await credentialRepository.getById(userId, credentialId);
    if (!credential) throw NotFound();
    const decryptPassword = passwordHash.decrypt(credential.password);
    const result: Credential = {
        id: credential.id,
        userId: credential.userId,
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password: decryptPassword,
    }
    return result;
}

async function deleteCredential(userId: number, credentialId: number){
    const credential = await credentialRepository.getById(userId, credentialId);
    if (!credential) throw NotFound();
    await credentialRepository.deleteCredential(userId, credentialId);
    return 'ok';
}

export const credentialService = {
    create,
    getAll,
    getById,
    deleteCredential
}