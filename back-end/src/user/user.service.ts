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
    const info = await this.userModel.aggregate([
      { $match: { phone: phone } },
      {
        $lookup: {
          from: 'feedbacks',
          pipeline: [
            {
              $match: {
                author: phone,
              },
            },
          ],
          as: 'feedbacks',
        },
      },
      {
        $lookup: {
          from: 'inquiries',
          pipeline: [
            {
              $match: {
                author: phone,
              },
            },
          ],
          as: 'inquiries',
        },
      },
    ]);
    if (info.length == 0) throw new NotFoundException();

    return info;
  }

  async updateProfile(dto: UpdateProfileDto, phone: string) {
    await this.userModel.findOneAndUpdate(
      { phone: phone },
      dto.address
        ? {
            address: dto.address,
            addressName: dto.addressName,
            name: dto.name,
            avatar: dto.avatar,
          }
        : { name: dto.name, avatar: dto.avatar },
    );
  }

  async createTrackingPlace(dto: CreateTrackingPlaceDto, phone: string) {
    const trackingPlace = {
      title: dto.title,
      address: dto.address,
      addressName: dto.addressName,
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
