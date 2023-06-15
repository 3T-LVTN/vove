import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NofDocument } from './nof.schema';

@Injectable()
export class NofService {
  constructor(@InjectModel('Nof') private nofModel: Model<NofDocument>) {}

  async getNof(phone: string) {
    return await this.nofModel.find({
      $or: [{ author: phone }, { isAdmin: true }],
    });
  }
}
