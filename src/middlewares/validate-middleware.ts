import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError, invalidDataError } from '../errors/index';
import { authRepository } from '@/repositories';

type ValidateMiddleware = (req: Request, res: Response, next: NextFunction) => void;


function validate(schema: ObjectSchema, type: 'body' | 'params') {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[type], {
            abortEarly: false,
        });

        if (!error) {
            next();
        } else {
            let errorMessage = '';
            error.details.forEach((d) => (errorMessage += d.message + ' '));
            throw invalidDataError(errorMessage);
        }
    };
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidateMiddleware {
    return validate(schema, 'params');
}

 export function validateBody<T>(schema: ObjectSchema<T>): ValidateMiddleware {
    return validate(schema, 'body');
}

export async function validateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    if (!authHeader) throw unauthorizedError();
  
    const token = authHeader.split(' ')[1];
    if (!token) throw unauthorizedError();
  
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as UserId;
  
    const session = await authRepository.findSession(token);
    if (!session) throw unauthorizedError();
  
    req.userId = userId;
    next();
  }
  
  export type AuthenticatedRequest = Request & UserId;
  
  type UserId = {
    userId: number;
  };
  