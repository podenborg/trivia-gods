export type Question = {
  id: string,
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  times_correct: number,
  times_incorrect: number,
  last_guess_correct: boolean,
}

export type Questions = Question[];