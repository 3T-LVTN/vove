import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InquirieService } from './inquirie.service';
import { InquirieController } from './inquirie.controller';
import { InquirieSchema } from './inquirie.schema';
import { UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Inquirie', schema: InquirieSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [InquirieController],
  providers: [InquirieService],
})
export class InquirieModule {}
