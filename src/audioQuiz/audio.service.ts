/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Audio, AudioDocument } from '../schemas/audio.schema';
import { AudioContent, AudioContentDocument } from '../schemas/audioContent.schema';
import { Model } from 'mongoose';
import { CreateAudioQuizDto } from "./dto/create-audioQuiz.dto";
import { ObjectId } from "mongoose";
import { CreateAudioQuizContentDto } from "./dto/create-audioQuizContent.dto";
import { FileStoreService, FileType } from "src/file/file.service";
import { FileStore, FileStoreDocument } from "src/schemas/file.schema";

@Injectable()
export class AudioService {

    constructor(
        @InjectModel(Audio.name) private audioModel: Model<AudioDocument>,
        @InjectModel(AudioContent.name) private audioContentModel: Model<AudioContentDocument>,
        @InjectModel(FileStore.name) private fileStoreModel: Model<FileStoreDocument>) {}

    async create(dto:CreateAudioQuizDto, image):Promise<Audio> {
        const imageInst = await this.fileStoreModel.create({data: image.buffer, contentType: image.mimetype});
        const imagePath =  'file/' + imageInst._id
        const {tags} = dto
        const parsedTags = JSON.parse(tags)
        const audioQuiz = await this.audioModel.create({...dto, playCount:0, imgURL: imagePath, tags: parsedTags});
        return audioQuiz;
    }

    async getAll(count = 10, offset=0): Promise<Audio[]> {
        const audioQuizzes = await this.audioModel.find().skip(Number(offset)).limit(Number(count)).sort('viewCount');
        return audioQuizzes;
    }

    async getOne(id: ObjectId): Promise<Audio> {
        const audioQuiz = await this.audioModel.findById(id).populate('content');
        return audioQuiz;
    }

    async search(nameQuiz:string, tagQuiz:string): Promise<Audio[]> {
        const audioQuizzes = await this.audioModel.find({
            name: {$regex: new RegExp(nameQuiz, 'i')},
            tags: {$regex: new RegExp(tagQuiz, 'i')}
        })
        return audioQuizzes;
    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const audioQuiz = await this.audioModel.findByIdAndDelete(id);
        return audioQuiz._id;
    }

    async addContent(dto: CreateAudioQuizContentDto, audio): Promise<AudioContent>{
        const audioInst = await this.fileStoreModel.create({data: audio.buffer, contentType: audio.mimetype});
        const audioPath =  'file/' + audioInst._id
        const audioQuiz = await this.audioModel.findById(dto.audioQuizId);
        const {secondaryAnswers} = dto
        const parsedSecondaryAnswers = JSON.parse(secondaryAnswers)
        const content = await this.audioContentModel.create({...dto, audioURL: audioPath, secondaryAnswers: parsedSecondaryAnswers})
        audioQuiz.content.push(content._id)
        await audioQuiz.save()
        return content;
    }

    async complete(id: ObjectId) {
        const audioQuiz = await this.audioModel.findById(id);
        audioQuiz.playCount += 1;
        audioQuiz.save()
    }
}
