import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzDTO } from './create-quizz.dto';

export class UpdateQuizzDTO extends PartialType(CreateQuizzDTO) {}
