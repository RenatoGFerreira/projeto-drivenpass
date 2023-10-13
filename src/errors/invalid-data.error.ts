import { ApplicationError } from '@/protocols';

export function invalidDataError(details: string): ApplicationError {
  return {
    name: 'InvalidData',
    message: `[ERRO] Invalid data: ${details}`,
  };
}