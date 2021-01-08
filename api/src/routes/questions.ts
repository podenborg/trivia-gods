import express, { Request, Response, NextFunction } from "express";
import { QuestionsService } from "../services"
const router = express.Router();

/* GET questions. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await QuestionsService.findAll();
    res.status(200).json(questions);
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
});

export default router;