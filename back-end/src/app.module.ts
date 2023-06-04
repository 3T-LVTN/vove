import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';
import { InquirieModule } from './inquirie/inquirie.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    AuthModule,
    UserModule,
    FeedbackModule,
    InquirieModule,
  ],
})
export class AppModule {}
