import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateInquiryDto,
  CloseInquiryDto,
  CommentInquiryDto,
} from './dto/inquiry.dto';

import { InquirieDocument } from './inquirie.schema';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class InquirieService {
  constructor(
    @InjectModel('Inquirie') private inquirieModel: Model<InquirieDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async createInquiry(dto: CreateInquiryDto, phone: string) {
    await this.inquirieModel.create({
      ...dto,
      time: new Date(),
      author: phone,
      status: 0,
    });
  }

  async closeInquiry(dto: CloseInquiryDto, phone: string) {
    if (!dto.id.match(/^[0-9a-fA-F]{24}$/)) throw new ForbiddenException();

    await this.inquirieModel.findOneAndUpdate(
      { author: phone, _id: dto.id, status: !2 },
      { status: 2 },
    );
  }

  async commentInquiry(dto: CommentInquiryDto, phone: string) {
    if (!dto.id.match(/^[0-9a-fA-F]{24}$/)) throw new ForbiddenException();
    const comment = {
      isAdmin: false,
      message: dto.message,
      time: new Date(),
    };

    await this.inquirieModel.findOneAndUpdate(
      { author: phone, _id: dto.id, status: !2 },
      { $push: { comments: comment } },
    );
  }
}
