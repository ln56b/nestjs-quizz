export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  answers?: Answer[];
  index?: number;
  userAnswerId?: string;
}

export interface Category {
  hero: string;
  question: Question;
}

export interface Quizz {
  id: number;
  categories: Category[];
  selectedQuestionIndex: number;
  canUseFiftyFiftyJoker: boolean;
  canUsePublicVote: boolean;
  score: number;
  quizzStartedTime: string;
  quizzEndTime: string;
}
