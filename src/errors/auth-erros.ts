import { ApplicationError } from "@/protocols";

export function userExists(): ApplicationError {
    return {
        name: "DuplicatedEmailError",
        message: "[ERRO] This user already exists."
    }
}

export function NotFound(): ApplicationError {
    return {
        name: "NotFoundError",
        message: "[ERRO] User not found."
    }
}

export function invalidCredentialsError(): ApplicationError {
    return {
        name: 'InvalidCredentialsError',
        message: '[ERRO] email or password incorrectly',
    };
}

export function unauthorizedError(): ApplicationError {
    return {
        name: 'UnauthorizedError',
        message: '[Erro] Please, sign-in again',
    };
}
