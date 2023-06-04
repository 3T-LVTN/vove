import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema()
class Location {
  @Prop()
  lat: number;

  @Prop()
  lng: number;
}

@Schema()
export class Feedback {
  @Prop()
  author: string;

  @Prop()
  address: Location;

  @Prop()
  time: Date;

  @Prop()
  status: number;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
