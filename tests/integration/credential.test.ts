import server, { init } from '../../src/server';
import supertest from "supertest";
import { cleanDb } from "./helpers"
import * as jwt from 'jsonwebtoken';

const app = supertest(server)

beforeAll(async () => {
    await init();
    await cleanDb();
});