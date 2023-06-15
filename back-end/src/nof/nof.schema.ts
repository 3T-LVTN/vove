import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NofDocument = HydratedDocument<Nof>;

@Schema()
export class Nof {
  @Prop()
  isAdmin: boolean;

  @Prop()
  author: string;

  @Prop()
  message: string;

  @Prop()
  time: Date;
}

export const NofSchema = SchemaFactory.createForClass(Nof);
