import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Audio } from './audio.schema';
import * as mongoose from 'mongoose';

export type FileStoreDocument = FileStore & Document;

@Schema()
export class FileStore {
  @Prop()
  data: Buffer;

  @Prop()
  contentType: string;
}

export const FileStoreSchema = SchemaFactory.createForClass(FileStore);
