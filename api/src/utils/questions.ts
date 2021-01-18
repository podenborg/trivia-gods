import { Question } from "../types";

export const sortByDifficultyAsc = (a: Question, b: Question) => {
  const difficulties: {[key: string]: number} = {
    "easy": 1,
    "medium": 2,
    "hard": 3
  };

  if (difficulties[a.difficulty] < difficulties[b.difficulty]) {
    return -1;
  } else if (difficulties[a.difficulty] > difficulties[b.difficulty]) {
    return 1;
  } else {
    return 0;
  }
};