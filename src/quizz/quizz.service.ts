import { Global, Injectable } from '@nestjs/common';
import { Quizz } from '../shared/models';
import { CreateQuizzDTO } from './create-quizz.dto';
import { GlobalService } from 'src/utils/global.service';
import { UpdateQuizzDTO } from './update-quizz.dto';

@Injectable({})
export class QuizzService {
  static quizzState: {
    id: number;
    selectedQuestionIndex: number;
    canUseFiftyFiftyJoker: boolean;
    canUsePublicVote: boolean;
    score: number;
    quizzStartedTime: string;
    quizzEndTime: string;
  };

  async getQuizzes(): Promise<Quizz[]> {
    return GlobalService.allQuizzes;
  }

  async getOneQuizz(id: number): Promise<Quizz> {
    return GlobalService.allQuizzes[id - 1];
  }

  async postQuizz(createQuizzDTO: CreateQuizzDTO): Promise<Quizz> {
    const previousId = GlobalService.allQuizzes.length
      ? GlobalService.allQuizzes[GlobalService.allQuizzes.length - 1].id
      : 0;

    const newQuizz = {
      ...createQuizzDTO,
      id: previousId + 1,
    };
    return newQuizz;
  }

  async updateQuizz(
    id: number,
    updateQuizzDTO: UpdateQuizzDTO,
  ): Promise<Quizz> {
    const quizzToUpdate = {
      ...GlobalService.allQuizzes[id - 1],
      updateQuizzDTO,
    };
    return quizzToUpdate;
  }
}
