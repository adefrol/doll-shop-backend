import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { GetToken } from './decorators/token.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ProfileUserDto } from 'src/user/dto/profile-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get('profile')
  getProfile(@GetToken() token: string) {
    return this.authService.getProfile(token);
  }
  @Get('purchases')
  getProfilePurchases(@GetToken() token: string) {
    return this.authService.getProfileRelation(token);
  }

  @UseGuards(RolesGuard)
  @Get('admin')
  async isAdmin() {
    return { status: 200 };
  }

  @UseGuards(JwtAuthGuard)
  @Get('isLogin')
  async isLogged() {
    return { status: 200 };
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-pass')
  changePassword(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.changePassword(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async edit(@Body() profileUserDto: ProfileUserDto) {
    return this.userService.update(profileUserDto);
  }
}
