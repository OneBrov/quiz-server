/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Audio, AudioSchema } from '../schemas/audio.schema';
import { AudioContent, AudioContentSchema } from '../schemas/audioContent.schema';
import { FileStoreService } from 'src/file/file.service';
import { FileStore, FileStoreSchema } from 'src/schemas/file.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{name:Audio.name, schema: AudioSchema}]),
      MongooseModule.forFeature([{name:AudioContent.name, schema: AudioContentSchema}]),
      MongooseModule.forFeature([
        { name: FileStore.name, schema: FileStoreSchema },
      ]),
  ],
  controllers: [AudioController],
  providers: [AudioService, FileStoreService]
  
})
export class AudioModule {}
