export type Difficulty = 'easy' | 'medium' | 'hard';

export type CountryDifficulty = Difficulty;

export type CountryFromJson = {
  name: string;
  code: string;
  difficulty: CountryDifficulty;
};

export type Country = CountryFromJson & {
  flag: string;
};

export type QuizQuestion = {
  correct: Country;
  answers: string[];
};
