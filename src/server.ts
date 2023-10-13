import express, {Express, Request, Response} from "express"
import cors from 'cors'
import httpStatus from "http-status";
import { authRouter, credentialRouter } from "./routes";
import { connectDb, disconnectDB } from './config';
import dotenv from "dotenv"
dotenv.config()

const server = express()
server
    .use(cors())
    .use(express.json())
    .use('/auth', authRouter)
    .use('/credential', credentialRouter)


server.get("/health", (req: Request, res: Response) => res.send(httpStatus.OK))

// const port = process.env.PORT || 5000;
// server.listen(port, () => console.log(`Server is up and running in port ${port}`))

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(server);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default server;
