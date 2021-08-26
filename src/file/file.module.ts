import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileStore, FileStoreSchema } from 'src/schemas/file.schema';
import { FileStoreController } from './file.controller';
import { FileStoreService } from './file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileStore.name, schema: FileStoreSchema },
    ]),
  ],
  controllers: [FileStoreController],
  providers: [FileStoreService],
})
export class FileStoreModule {}