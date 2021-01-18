import express, { Request, Response } from "express";
import { questionsDb } from "../db";
const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response) {
  res.send("Hello from Express and TypeScript!");
});

router.get('/test', async (req: Request, res: Response) => {
  try {
    const questions = [
      {
        id: "001",
        type: "multiple",
        category: "Mythology",
        difficulty: "easy",
        question: "How old are you?",
        user_answer: "27",
        correct_answer: "27",
        session_id: "e3wSCsWRGz",
        incorrect_answers: [
          "25",
          "26",
          "24"
        ],
      },
      {
        id: "002",
        type: "multiple",
        category: "Mythology",
        difficulty: "medium",
        question: "What's your name?",
        user_answer: "Dan",
        correct_answer: "Patrick",
        session_id: "e3wSCsWRGz",
        incorrect_answers: [
          "Dan",
          "Mark",
          "Caleb"
        ],
      },
      {
        id: "003",
        type: "multiple",
        category: "Mythology",
        difficulty: "hard",
        question: "Where do you live?",
        user_answer: "Austin",
        correct_answer: "Austin",
        session_id: "e3wSCsWRGz",
        incorrect_answers: [
          "Dallas",
          "El Paso",
          "Houston"
        ],
      },
    ];

    const result = await questionsDb.storeQuestions(questions);
    console.log("RESULT", result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;