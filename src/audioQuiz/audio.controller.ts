/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { CreateAudioQuizDto } from "./dto/create-audioQuiz.dto";
import { ObjectId } from "mongoose";
import { CreateAudioQuizContentDto } from "./dto/create-audioQuizContent.dto";
import { FileInterceptor } from "@nestjs/platform-express/multer";


@Controller('/audio')
export class AudioController {

    constructor(private audioService: AudioService) {  }
    
    @Post()
    @UseInterceptors(FileInterceptor('image'))
     create( @UploadedFile() image: Express.Multer.File, 
             @Body() dto: CreateAudioQuizDto) {
        return this.audioService.create(dto, image);
    }

    @Get()  
     getAll(@Query('count') count: number,
            @Query('offset') offset: number) {
        return this.audioService.getAll(count, offset);
    }

    @Get('/search')
    search(@Query('name') nameQuiz:string,
           @Query('tag') tagQuiz:string) {
        return this.audioService.search(nameQuiz, tagQuiz)
    }

    @Get(':id')
     getOne(@Param('id') id: ObjectId) {
        return this.audioService.getOne(id);
    }

    @Delete(':id')
     delete(@Param('id') id: ObjectId) {
        return this.audioService.delete(id);
    }

    @Post('/content')
    @UseInterceptors(FileInterceptor('audio'))
     addContent(    
            @UploadedFile() audio: Express.Multer.File, 
            @Body() dto: CreateAudioQuizContentDto) {
        return this.audioService.addContent(dto, audio);
    }

    @Post('/complete/:id')
    complete(@Param('id') id: ObjectId) {
        return this.audioService.complete(id);
    }

}