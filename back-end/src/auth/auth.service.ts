import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';

import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.userModel
      .findOne({
        $or: [{ phone: dto.phone }],
      })
      .select({ _id: 0, phone: 1 })
      .lean();

    if (user) {
      throw new ConflictException('User exits');
    }

    await this.userModel.create({
      ...dto,
      password: hashedPassword,
      avatar:
        'https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/vove.png',
    });
  }

  async forgotPassword(dto: LoginDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    await this.userModel.findOneAndUpdate(
      { phone: dto.phone },
      { password: hashedPassword },
    );
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userModel.findOne({ phone: dto.phone });
    const payload = { phone: dto.phone };

    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } else throw new UnauthorizedException();
  }

  async refreshToken(phone: string) {
    const payload = { phone: phone };
    return await this.jwtService.signAsync(payload);
  }
}
