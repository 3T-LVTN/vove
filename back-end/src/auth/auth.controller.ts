import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import mongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';

import { CreateUserDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';

import { User } from 'src/user/user.schema';

@Controller('auth')
@UseInterceptors(mongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async createUser(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('/forgot-password')
  // async changePassword(@Body() dto: ChangePasswordDto, @Req() req) {
  //   return this.authService.changePassword(dto, req.user);
  // }
  async forgotPassword(@Body() dto: LoginDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return this.authService.validateUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/refresh')
  async refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user);
  }
}
