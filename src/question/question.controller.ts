import {
  Controller,
  Get,
  Patch,
  Res,
  Param,
  Body,
  NotFoundException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Endpoint } from '../shared/endpoint.enum';
import { UpdateQuestionDTO } from './update-question.dto';

@Controller(Endpoint.QUIZZES)
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get(`:quizzId/${Endpoint.QUESTIONS}`)
  getQuestions() {
    return this.questionService.getQuizzQuestions(1);
  }

  @Get(`:quizzId/${Endpoint.QUESTIONS}/:id`)
  getOneQuestionFromQuizz() {
    return this.questionService.getOneQuestion(1, 3);
  }

  @Put(`:quizzId/${Endpoint.QUESTIONS}/:id`)
  async updateQuestionFromQuizz(
    @Res() res,
    @Param('quizzId') quizzId: number,
    @Param('id') id: number,
    @Body() updateQuestionDTO: UpdateQuestionDTO,
  ) {
    const question = await this.questionService.updateQuestion(
      quizzId,
      id,
      updateQuestionDTO,
    );

    if (!question) {
      throw new NotFoundException('Question does not exist');
    }

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Question successfully updated', question });
  }
}
