import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InquirieDocument = HydratedDocument<Inquirie>;

@Schema()
class Comment {
  @Prop()
  isAdmin: boolean;

  @Prop()
  message: string;

  @Prop()
  time: Date;
}

@Schema()
class Inquirie {
  @Prop()
  id: string;

  @Prop()
  author: string;

  @Prop()
  status: number;

  @Prop()
  title: string;

  @Prop()
  time: Date;

  @Prop()
  message: string;

  @Prop()
  comments: [Comment];
}

export const InquirieSchema = SchemaFactory.createForClass(Inquirie);
