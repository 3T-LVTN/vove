import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateFeedbackDto } from './dto/create.dto';

import { FeedbackDocument } from './feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private feedbackModel: Model<FeedbackDocument>,
  ) {}

  async createFeedback(dto: CreateFeedbackDto, phone: string) {
    await this.feedbackModel.create({
      ...dto,
      time: new Date(),
      author: phone,
      address: dto.address,
    });
  }
}
