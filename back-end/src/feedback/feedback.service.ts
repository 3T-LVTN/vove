import { ForbiddenException, Injectable } from '@nestjs/common';
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
    const latestFeedback = await this.feedbackModel
      .findOne({ address: dto.address, author: phone })
      .sort({ $natural: -1 });

    if (latestFeedback) {
      const latestTime = new Date(latestFeedback.time).getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      const presentTime = new Date().getTime();
      if (latestTime + oneDay > presentTime) {
        const availableTime = new Date(latestTime + oneDay);
        throw new ForbiddenException(availableTime);
      }
    }

    await this.feedbackModel.create({
      ...dto,
      time: new Date(),
      author: phone,
      address: dto.address,
    });
  }
}
