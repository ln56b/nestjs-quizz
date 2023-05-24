import { Module } from '@nestjs/common';
import { QuizzModule } from './quizz/quizz.module';

@Module({
  imports: [QuizzModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
