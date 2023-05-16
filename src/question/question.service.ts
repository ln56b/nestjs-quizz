import { Injectable } from '@nestjs/common';
import { UpdateQuestionDTO } from './update-question.dto';

@Injectable({})
export class QuestionService {
  getQuizzQuestions(quizzId: number) {
    return { msg: `All questions for quizzId: ${quizzId}` };
  }

  getOneQuestion(quizzId: number, questionId: number) {
    return { msg: `Qestion id: ${questionId}` };
  }

  updateQuestion(
    quizzId: number,
    questionId: number,
    questionToUpdate: UpdateQuestionDTO,
  ) {
    return { msg: `Updated question id: ${questionId}` };
  }
}
