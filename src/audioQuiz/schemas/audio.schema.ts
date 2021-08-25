import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AudioContent } from './audioContent.schema';
import * as mongoose from 'mongoose';

export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop()
  name: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop()
  imgURL: string;

  @Prop()
  playCount: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AudioContent' }],
  })
  content: AudioContent[];
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
