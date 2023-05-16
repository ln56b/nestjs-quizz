import { IsArray, IsNumber, IsString } from 'class-validator';
import { Answer } from '../shared/models';

export class CreateQuestionDTO {
  @IsNumber()
  index: number;

  @IsString()
  text: string;

  @IsArray()
  answers: Answer[];

  @IsNumber()
  userAnswerId: number;
}
