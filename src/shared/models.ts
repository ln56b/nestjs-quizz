export interface Answer {
  id: number;
  label: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
}

export interface Category {
  hero: string;
  question: Question;
  answers: Answer[];
}

export interface Quizz {
  id: number;
  name: string;
  categories: Category[];
  selectedQuestionIndex?: number;
  canUseFiftyFiftyJoker: boolean;
  canUsePublicVote: boolean;
  score: number;
  userAnswers: Answer[];
  totalTime: Duration;
  isCompleted: boolean;
}

export interface Duration {
  min: number;
  sec: number;
}
