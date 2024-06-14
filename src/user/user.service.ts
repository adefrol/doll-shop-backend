import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileUserDto } from './dto/profile-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(email?: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByIdRelation(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        purchases: { purchaseDetails: { product: true } },
      },
    });
  }

  async register(createUserDto: CreateUserDto) {
    console.log('ok');
    const existUser = await this.userRepository.findOne({
      where: [
        {
          email: createUserDto.email,
        },
      ],
    });
    if (existUser) {
      throw new ConflictException(
        'Пользователь с таким e-mail или логином уже существует',
      );
    }

    const user = await this.userRepository.save({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      phone: createUserDto.phone,
    });
    return { user, statusCode: 200 };
  }

  async changePassword(updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(updateUserDto.id);

    if (user.password != updateUserDto.oldPass) {
      throw new BadRequestException();
    }

    await this.userRepository.save({
      id: updateUserDto.id,
      password: updateUserDto.newPass,
    });
  }

  async update(profileUserDto: ProfileUserDto) {
    return await this.userRepository.save({
      id: profileUserDto.id,
      email: profileUserDto.email,
      name: profileUserDto.name,
      phone: profileUserDto.phone,
    });
  }
}
