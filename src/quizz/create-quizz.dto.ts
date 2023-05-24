import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category, Answer } from 'src/shared/models';

export class CreateQuizzDTO {
  @IsString()
  name: string;

  @IsNumber()
  selectedQuestionIndex: number;

  @IsArray()
  categories: Category[];

  @IsArray()
  userAnswers: Answer[];

  @IsBoolean()
  canUseFiftyFiftyJoker: boolean;

  @IsBoolean()
  canUsePublicVote: boolean;

  @IsNumber()
  score: number;

  @IsDate()
  quizzStartedTime: string;

  @IsDate()
  quizzEndTime: string;
}
