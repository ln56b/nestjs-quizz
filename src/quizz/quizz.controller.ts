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
  async createQuizz(@Body() body: { name: string }, @Res() res) {
    try {
      const quizz = await this.quizzService.postQuizz(body.name);
      GlobalService.allQuizzes.push(quizz);
      return res.status(HttpStatus.OK).json({
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
