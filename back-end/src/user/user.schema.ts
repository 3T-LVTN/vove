import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
class TrackingPlace {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  address: string;
}

@Schema()
class Comment {
  @Prop()
  isAdmin: boolean;

  @Prop()
  message: string

  @Prop()
  time: Date;
}

@Schema()
class Inquiry {
  @Prop()
  id: string;

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

@Schema()
export class User {
  @Prop({ unique: true })
  phone: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  trackingPlaces: [TrackingPlace];

  @Prop()
  inquiries: [Inquiry];
  
  @Prop({ required: true })
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);