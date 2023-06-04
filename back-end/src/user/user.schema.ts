import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
class Location {
  @Prop()
  lat: number;

  @Prop()
  lng: number;
}

@Schema()
class TrackingPlace {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  address: Location;
}

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
  avatar: string;

  @Prop()
  name: string;

  @Prop()
  address: Location;

  @Prop()
  trackingPlaces: [TrackingPlace];

  @Prop()
  inquiries: [Inquiry];

  @Prop({ required: true })
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
