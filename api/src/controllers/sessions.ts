import { Question } from "../types";
import { Request, Response } from "express";
import { sessionsService, questionsService } from "../services";

const { createSession, resumeSession } = sessionsService;
const { saveQuestions } = questionsService;

export const handleGetSession = async (req: Request, res: Response) => {      
  try {
    const amount = req.query.amount as string;
    const token = req.query.token as string;

    if (!token) {
      const { questions, token } = await createSession(amount);      
      res.status(200).json({ questions, token });         
    } else {
      const questions = await resumeSession(amount, token);
      res.status(200).json({ questions, token });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const handleSaveSession = async (req: Request, res: Response) => {
  try {
    const { sessionId, questions } = req.body;

    console.log("SESSION ID", sessionId);
    console.log("QUESTIONS", questions);

    const questionsWithSessionId = questions.map((q: Question) => ({ ...q, session_id: sessionId }));

    console.log("QUESTIONS WITH ID", questionsWithSessionId);

    await saveQuestions(questionsWithSessionId);
    res.status(200).json({ statusCode: 200, status: "success", message: "Successfully stored session data." });
  } catch (error) {
    res.status(400).send(error.message);
  }
};