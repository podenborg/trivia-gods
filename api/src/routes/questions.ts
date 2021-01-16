import express from "express";
import { questions } from "../controllers";

const router = express.Router();

/* POST save questions */
router.post('/', questions.saveQuestions);

export default router;