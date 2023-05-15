import { Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { QuizzModule } from './quizz/quizz.module';

@Module({
  imports: [QuizzModule, QuestionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
