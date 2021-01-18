import { Question } from "../types";
import { Request, Response } from "express";
import { sessionsService, questionsService } from "../services";

const { createSession, resumeSession } = sessionsService;
const { saveQuestions } = questionsService;

export const handleGetSession = async (req: Request, res: Response) => {      
  try {
    const amount = req.query.amount as string;
    const token = req.query.token as string;
    const sessionId = req.query.sessionId as string;

    if (!token) {
      const { questions, token } = await createSession(Number(amount));
      res.status(200).json({ 
        statusCode: 200,
        status: "success",
        data: {
          questions: questions, 
          token: token
        }
      });
    } else {
      const questions = await resumeSession(Number(amount), token, sessionId);
      res.status(200).json({ 
        statusCode: 200,
        status: "success",
        data: {
          questions: questions, 
          token: token
        }
      });
    }
  } catch (error) {    
    res.status(400).json({
      status: "error",
      statusCode: 400,
      message: error.message
    });
  }
};

export const handleSaveSession = async (req: Request, res: Response) => {
  try {
    const { sessionId, questions } = req.body;  
    const questionsWithSessionId = questions.map((q: Question) => ({ ...q, session_id: sessionId }));

    await saveQuestions(questionsWithSessionId);
    res.status(200).json({ 
      statusCode: 200, 
      status: "success",
      message: "Successfully stored session data." 
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      statusCode: 400,
      message: error.message
    });
  }
};