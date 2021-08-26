import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Audio } from './audio.schema';
import * as mongoose from 'mongoose';

export type AudioContentDocument = AudioContent & Document;

@Schema()
export class AudioContent {
  @Prop()
  answer: string;

  @Prop()
  secondaryAnswers: string[];

  @Prop()
  audioURL: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' }] })
  audio: Audio;
}

export const AudioContentSchema = SchemaFactory.createForClass(AudioContent);
