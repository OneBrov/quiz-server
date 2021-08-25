import { AudioContent } from '../schemas/audioContent.schema';

export class CreateAudioQuizDto {
  readonly name: string;
  tags: string;
}
