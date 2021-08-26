/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { FileStore, FileStoreDocument } from "src/schemas/file.schema";

export enum FileType {
    AUDIO = 'audioSource',
    IMAGE = 'imageSource'
}

@Injectable()
export class FileStoreService {
    constructor(
        @InjectModel(FileStore.name) private fileStoreModel: Model<FileStoreDocument>,
    ) {}
     

    async createFile(type: FileType, file):Promise<string> {
        try {
            // const fileExtension = file.originalname.split('.').pop()
            // const fileName = uuid.v4() + '.' + fileExtension
            const newFile = await this.fileStoreModel.create({data: file})
            console.log(newFile._id)
            // const filePath = path.resolve(__dirname, '..', 'static', type)
            // if (!fs.existsSync(filePath)) {
            //     fs.mkdirSync(filePath, {recursive: true})
            // }
            // fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return newFile._id
        } catch (err) {
            console.log(err)
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOne(id: ObjectId, res): Promise<any> {
        const file = await this.fileStoreModel.findById(id);
        // const stream = fs.createReadStream(file.data)
        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(file.data);
    }

    removeFile(fileName: string){

    }
}