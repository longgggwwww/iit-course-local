import { Prisma } from '@prisma/client';

export class CreateQuestionDto implements Prisma.QuestionCreateInput {
  type: string;
  level: number;
  point: number;
  content?: string;
  answer01?: string;
  answer02?: string;
  answer03?: string;
  answer04?: string;
  answer05?: string;
  answer06?: string;
  lines?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  topic: Prisma.TopicCreateNestedOneWithoutQuestionsInput;
  exam?: Prisma.ExamCreateNestedOneWithoutQuestionsInput;
}
