import { ObjectId } from "mongoose";

export class CreateAudioQuizContentDto {
  readonly answer: string;
  secondaryAnswers: string;
  readonly audioQuizId: ObjectId;
}
