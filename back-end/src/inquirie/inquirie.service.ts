import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateInquiryDto,
  CloseInquiryDto,
  CommentInquiryDto,
} from './dto/inquiry.dto';

import { InquirieDocument } from './inquirie.schema';
import { NofDocument } from 'src/nof/nof.schema';

@Injectable()
export class InquirieService {
  constructor(
    @InjectModel('Inquirie') private inquirieModel: Model<InquirieDocument>,
    @InjectModel('Nof') private nofModel: Model<NofDocument>,
  ) {}

  async createInquiry(dto: CreateInquiryDto, phone: string) {
    await this.inquirieModel.create({
      ...dto,
      time: new Date(),
      author: phone,
      status: 0,
      id: uuidv4(),
    });
    const message = 'Yêu cầu hỗ trợ đã được gửi - ' + dto.title;
    await this.nofModel.create({
      isAdmin: false,
      time: new Date(),
      author: phone,
      message: message,
    });
  }

  async closeInquiry(dto: CloseInquiryDto, phone: string) {
    await this.inquirieModel.findOneAndUpdate(
      { author: phone, id: dto.id },
      { status: 2 },
    );
    const message = 'Yêu cầu hỗ trợ đã đóng - ' + dto.title;
    await this.nofModel.create({
      isAdmin: false,
      time: new Date(),
      author: phone,
      message: message,
    });
  }

  async commentInquiry(dto: CommentInquiryDto, phone: string) {
    const comment = {
      isAdmin: false,
      message: dto.message,
      time: new Date(),
    };

    await this.inquirieModel.findOneAndUpdate(
      {
        $or: [
          { author: phone, id: dto.id, status: 0 },
          { author: phone, id: dto.id, status: 1 },
        ],
      },
      { $push: { comments: comment } },
    );
  }
}
