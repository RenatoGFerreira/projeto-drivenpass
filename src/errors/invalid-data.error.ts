import { ApplicationError } from '@/protocols';

export function invalidDataError(details: string): ApplicationError {
  return {
    name: '[ERRO] InvalidData',
    message: `Invalid data: ${details}`,
  };
}