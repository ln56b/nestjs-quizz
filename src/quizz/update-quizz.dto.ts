import { IsArray, IsBoolean, IsDateString, IsNumber } from 'class-validator';
import { Answer, Duration } from 'src/shared/models';

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

  @IsNumber()
  totalTime: Duration;

  @IsBoolean()
  isCompleted: boolean;
}
