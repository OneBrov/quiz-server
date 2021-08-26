import { Controller, Get, Param, Res } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { FileStoreService } from './file.service';

@Controller('/file')
export class FileStoreController {
  constructor(private fileStoreService: FileStoreService) {}

  @Get(':id')
  getOne(@Param('id') id: ObjectId, @Res() res) {
    return this.fileStoreService.getOne(id, res);
  }
}
