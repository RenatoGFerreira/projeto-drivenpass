import { User } from '@prisma/client';
import { prisma } from '@/config/index';


export async function cleanDb() {
    await prisma.session.deleteMany({})
    await prisma.credential.deleteMany({})
    await prisma.user.deleteMany({})
}

export async function generateValidToken(user?: User) {

}