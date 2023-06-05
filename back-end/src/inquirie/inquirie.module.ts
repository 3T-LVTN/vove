import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InquirieService } from './inquirie.service';
import { InquirieController } from './inquirie.controller';
import { InquirieSchema } from './inquirie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inquirie', schema: InquirieSchema }]),
  ],
  controllers: [InquirieController],
  providers: [InquirieService],
})
export class InquirieModule {}
