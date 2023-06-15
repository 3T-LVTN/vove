import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NofService } from './nof.service';
import { NofController } from './nof.controller';
import { NofSchema } from './nof.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Nof', schema: NofSchema }])],
  controllers: [NofController],
  providers: [NofService],
})
export class NofModule {}
