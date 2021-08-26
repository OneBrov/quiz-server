/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AudioModule } from './audioQuiz/audio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { FileStoreModule } from './file/file.module';

@Module({
  imports: [
      ServeStaticModule.forRoot({
        rootPath: resolve(__dirname, 'static'),
      }),
      FileStoreModule,
      AudioModule, 
      MongooseModule.forRoot('mongodb+srv://admin2:admin@cluster0.jbu5l.mongodb.net/quiz-app?retryWrites=true&w=majority')
    ],
})
export class AppModule {}
