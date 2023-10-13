import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { invalidDataError } from '../errors/invalid-data.error';

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


