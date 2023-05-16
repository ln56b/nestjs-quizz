import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/utils/global.service';
import * as HEROES_HEADS from '../shared/heroes-heads.json';
import * as HEROES_TAILS from '../shared/heroes-tails.json';
import { Quizz } from '../shared/models';
import { UpdateQuizzDTO } from './update-quizz.dto';

export enum QuizzNames {
  HEADS = 'heads',
  TAILS = 'tails',
}

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

  async postQuizz(quizzname: string): Promise<Quizz> {
    const previousId = GlobalService.allQuizzes.length
      ? GlobalService.allQuizzes[GlobalService.allQuizzes.length - 1].id
      : 0;

    const newQuizz = {
      id: previousId + 1,
      name:
        quizzname === QuizzNames.HEADS ? QuizzNames.HEADS : QuizzNames.TAILS,
      categories: quizzname === QuizzNames.HEADS ? HEROES_HEADS : HEROES_TAILS,
      selectedQuestionIndex: 0,
      canUseFiftyFiftyJoker: true,
      canUsePublicVote: true,
      score: 0,
      quizzStartedTime: null,
      quizzEndTime: null,
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
