import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateQuizzDTO } from './create-quizz.dto';
import { IsArray, IsBoolean, IsDateString, IsNumber } from 'class-validator';
import { Answer } from 'src/shared/models';

export class UpdateQuizzDTO {
  @IsNumber()
  selectedQuestionIndex: number;

  @IsArray()
  userAnswers: Answer[];

  @IsBoolean()
  canUseFiftyFiftyJoker: boolean;

  @IsBoolean()
  canUsePublicVote: boolean;

  @IsNumber()
  score: number;

  @IsDateString() // TODO check format
  quizzEndTime: Date;
}
