/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserDocument } from './user.schema';
import { UpdateProfileDto } from './dto/update.dto';
import {
  CreateTrackingPlaceDto,
  UpdateTrackingPlaceDto,
  DeleteTrackingPlaceDto,
} from './dto/trackingplace.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getProfile(phone: string) {
    const info = await this.userModel.find({ phone: phone });

    if (!info) {
      throw new NotFoundException('Info not found!');
    }
    return info;
  }

  async updateProfile(dto: UpdateProfileDto, phone: string) {
    const address = {
      lat: dto.lat,
      lng: dto.lng,
    };

    await this.userModel.findOneAndUpdate(
      { phone: phone },
      dto.lat && dto.lng
        ? {
            address: address,
            name: dto.name,
            avatar: dto.avatar,
          }
        : { name: dto.name, avatar: dto.avatar },
    );
  }

  async createTrackingPlace(dto: CreateTrackingPlaceDto, phone: string) {
    const address = {
      lat: dto.lat,
      lng: dto.lng,
    };

    const trackingPlace = {
      title: dto.title,
      address: address,
      id: uuidv4(),
    };

    await this.userModel.findOneAndUpdate(
      { phone: phone },
      { $push: { trackingPlaces: trackingPlace } },
    );
  }

  async updateTrackingPlace(dto: UpdateTrackingPlaceDto, phone: string) {
    await this.userModel.findOneAndUpdate(
      { phone: phone, 'trackingPlaces.id': dto.id },
      { $set: { 'trackingPlaces.$.title': dto.title } },
    );
  }

  async deleteTrackingPlace(dto: DeleteTrackingPlaceDto, phone: string) {
    await this.userModel.findOneAndUpdate(
      { phone: phone },
      { $pull: { trackingPlaces: { id: dto.id } } },
    );
  }
}
