import {
  Controller,
  UseInterceptors,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import mongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { User } from './user.schema';
import { UpdateProfileDto } from './dto/update.dto';
import {
  CreateTrackingPlaceDto,
  UpdateTrackingPlaceDto,
  DeleteTrackingPlaceDto,
} from './dto/trackingplace.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@Controller('profile')
@UseInterceptors(mongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@Req() req) {
    return this.userService.getProfile(req.user);
  }

  @Post()
  async updateProfile(@Body() dto: UpdateProfileDto, @Req() req) {
    return this.userService.updateProfile(dto, req.user);
  }

  @Post('/create-trackingplace')
  async createTrackingPlace(@Body() dto: CreateTrackingPlaceDto, @Req() req) {
    return this.userService.createTrackingPlace(dto, req.user);
  }

  @Post('/update-trackingplace')
  async updateTrackingPlace(@Body() dto: UpdateTrackingPlaceDto, @Req() req) {
    return this.userService.updateTrackingPlace(dto, req.user);
  }

  @Post('/delete-trackingplace')
  async deleteTrackingPlace(@Body() dto: DeleteTrackingPlaceDto, @Req() req) {
    return this.userService.deleteTrackingPlace(dto, req.user);
  }
}
