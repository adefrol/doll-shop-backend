import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  id: number;
  oldPass: string;
  newPass: string;
}
