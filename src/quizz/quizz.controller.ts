import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Endpoint } from '../shared/endpoint.enum';
import { QuizzService } from './quizz.service';
import { CreateQuizzDTO } from './create-quizz.dto';
import * as HEROES from '../shared/hero.json';
import { GlobalService } from 'src/utils/global.service';
import { UpdateQuizzDTO } from './update-quizz.dto';

@Controller(Endpoint.QUIZZES)
export class QuizzController {
  constructor(private quizzService: QuizzService) {}

  @Get()
  async getQuizzes(@Res() res) {
    const quizzes = await this.quizzService.getQuizzes();
    return res.status(HttpStatus.OK).json(quizzes);
  }

  @Get(':id')
  async getOneQuizz(@Param('id') id: number, @Res() res) {
    const quizz = await this.quizzService.getOneQuizz(id);
    return res.status(HttpStatus.OK).json(quizz);
  }

  @Post()
  async createQuizz(@Body() createQuizzDTO: CreateQuizzDTO, @Res() res) {
    createQuizzDTO = {
      categories: HEROES,
      selectedQuestionIndex: 0,
      canUseFiftyFiftyJoker: true,
      canUsePublicVote: true,
      score: 0,
      quizzStartedTime: null,
      quizzEndTime: null,
    };

    try {
      const quizz = await this.quizzService.postQuizz(createQuizzDTO);
      GlobalService.allQuizzes.push(quizz);
      return res.status(HttpStatus.OK).json({
        message: 'Quizz successfully created',
        quizz,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Quizz not created',
        status: 400,
      });
    }
  }

  @Put(':id')
  async updateQuizz(
    @Param('id') id: number,
    @Body() updateQuizzDTO: UpdateQuizzDTO,
    @Res() res,
  ) {
    try {
      const quizz = await this.quizzService.updateQuizz(id, updateQuizzDTO);
      if (!quizz) {
        // TODO check try / catch
        throw new NotFoundException('Quizz does not exist');
      }
      GlobalService.allQuizzes[quizz.id - 1] = quizz;
      return res.status(HttpStatus.OK).json({
        message: 'Quizz successfully updated',
        quizz,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Quizz not updated',
        status: 400,
      });
    }
  }
}
