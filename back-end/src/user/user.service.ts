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
import {
  CreateInquiryDto,
  CloseInquiryDto,
  CommentInquiryDto,
} from './dto/inquiry.dto';

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
      lat: dto.lat || null,
      lng: dto.lng || null,
    };

    const trackingPlace = {
      title: 'Nhà của tôi',
      address: address,
      id: uuidv4(),
    };

    await this.userModel.findOneAndUpdate(
      { phone: phone },
      {
        address: dto.lat && dto.lng ? address : null,
        name: dto.name,
        avatar: dto.avatar
          ? dto.avatar
          : 'https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/vove.png',
        $push: { trackingPlaces: dto.lat && dto.lng ? trackingPlace : null },
      },
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

  async createInquiry(dto: CreateInquiryDto, phone: string) {
    const inquiry = {
      title: dto.title,
      message: dto.message,
      status: 0,
      time: new Date(),
      id: uuidv4(),
    };

    await this.userModel.findOneAndUpdate(
      { phone: phone },
      { $push: { inquiries: inquiry } },
    );
  }

  async closeInquiry(dto: CloseInquiryDto, phone: string) {
    await this.userModel.findOneAndUpdate(
      { phone: phone, 'inquiries.id': dto.id },
      { $set: { 'inquiries.$.status': 2 } },
    );
  }

  async commentInquiry(dto: CommentInquiryDto, phone: string) {
    const comment = {
      isAdmin: false,
      message: dto.message,
      time: new Date(),
    };

    await this.userModel.findOneAndUpdate(
      { phone: phone, 'inquiries.id': dto.id },
      { $push: { 'inquiries.$.comments': comment } },
    );
  }
}
