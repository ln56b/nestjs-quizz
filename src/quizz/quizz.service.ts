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
    return GlobalService.allQuizzes.filter((q) => q.quizzEndTime !== null);
  }

  async getOneQuizz(id: number): Promise<Quizz> {
    return GlobalService.allQuizzes[id - 1];
  }

  async postQuizz(name: string): Promise<Quizz> {
    const previousId = GlobalService.allQuizzes.length
      ? GlobalService.allQuizzes[GlobalService.allQuizzes.length - 1].id
      : 0;
    const newQuizz = {
      id: previousId + 1,
      name: name === QuizzNames.HEADS ? QuizzNames.HEADS : QuizzNames.TAILS,
      categories: name === QuizzNames.HEADS ? HEROES_HEADS : HEROES_TAILS,
      selectedQuestionIndex: 0,
      userAnswers: [],
      canUseFiftyFiftyJoker: true,
      canUsePublicVote: true,
      score: 0,
      quizzStartedTime: new Date(),
      quizzEndTime: null,
    };

    return newQuizz;
  }

  async updateQuizz(
    id: number,
    updateQuizzDTO: UpdateQuizzDTO,
  ): Promise<Quizz> {
    const currentQuizz = GlobalService.allQuizzes[id - 1];
    const quizzToUpdate = {
      id: currentQuizz.id,
      name: currentQuizz.name,
      selectedQuestionIndex: updateQuizzDTO.selectedQuestionIndex,
      categories: currentQuizz.categories,
      userAnswers: updateQuizzDTO.userAnswers,
      canUseFiftyFiftyJoker: updateQuizzDTO.canUseFiftyFiftyJoker,
      canUsePublicVote: updateQuizzDTO.canUsePublicVote,
      score: updateQuizzDTO.score,
      quizzStartedTime: currentQuizz.quizzStartedTime,
      quizzEndTime: updateQuizzDTO.quizzEndTime,
    };
    return quizzToUpdate; // TODO refacto
  }

  async deleteQuizz(id: number): Promise<Quizz> {
    return GlobalService.allQuizzes.find((q) => q.id === Number(id));
  }
}
