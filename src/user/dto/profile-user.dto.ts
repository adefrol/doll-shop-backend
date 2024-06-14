import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class ProfileUserDto {
  id: number;
  email: string;
  phone: string;
  name: string;
}
