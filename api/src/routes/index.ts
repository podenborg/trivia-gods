import { Question } from "../types";
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send("Hello from Express and TypeScript!");
});

import { questionsDb } from "../db";

// router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const answers = [
//       {id: '001', answer: "Zeus", is_correct: false, question_id: "001"},
//       {id: '002', answer: "Haydes", is_correct: false, question_id: "001"},
//       {id: '003', answer: "Jupiter", is_correct: true, question_id: "001"},  
//     ];
//     const result = await questionsDb.storeAnswers(answers);
//     console.log("test result:", result);
//     res.status(200).json(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions: Question[] = [
      {id: '001', category: "Mythology", type: "multiple", difficulty: "easy", question: "What's my name?", user_answer: "Pat", correct_answer: "Pat", incorrect_answers: ["Rob", "Collin", "Juan"],  },
      {id: '002', category: "Mythology", type: "multiple", difficulty: "medium", question: "What's your name?", user_answer: "Pat", correct_answer: "Rob", incorrect_answers: ["Rob", "Collin", "Juan"],  },      
    ];
    const result = await questionsDb.storeQuestions(questions);
    console.log("test result:", result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;