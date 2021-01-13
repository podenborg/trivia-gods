import questions from "../controllers/questions";
import express from "express";

const router = express.Router();

/* POST save questions */
router.post('/', questions.saveQuestions);

export default router;