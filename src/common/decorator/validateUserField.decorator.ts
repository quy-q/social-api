import { SetMetadata } from '@nestjs/common';
import { VALIDATE_FIELD_KEY } from '../constrains';

export const ValidateUserField = (...fields: string[]) =>
  SetMetadata(VALIDATE_FIELD_KEY, fields);
