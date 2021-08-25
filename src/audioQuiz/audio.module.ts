/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Audio, AudioSchema } from './schemas/audio.schema';
import { AudioContent, AudioContentSchema } from './schemas/audioContent.schema';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
      MongooseModule.forFeature([{name:Audio.name, schema: AudioSchema}]),
      MongooseModule.forFeature([{name:AudioContent.name, schema: AudioContentSchema}])
  ],
  controllers: [AudioController],
  providers: [AudioService, FileService]
  
})
export class AudioModule {}
