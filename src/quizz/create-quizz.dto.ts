import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from 'src/shared/models';

export class CreateQuizzDTO {
  @IsNumber()
  @IsNotEmpty()
  selectedQuestionIndex: number;

  @IsString()
  name: string;

  @IsArray()
  categories: Category[];

  @IsBoolean()
  canUseFiftyFiftyJoker: boolean;

  @IsBoolean()
  canUsePublicVote: boolean;

  @IsNumber()
  score: number;

  @IsDateString() // TODO check format
  quizzStartedTime: string;

  @IsDateString() // TODO check format
  quizzEndTime: string;
}
