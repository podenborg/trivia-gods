import { Request, Response } from "express";
import sessionsService from "../services/sessions";

const { createSession, resumeSession } = sessionsService;

const getSession = async (req: Request, res: Response) => {    
  const amount = req.query.amount as string;
  const token = req.query.token as string;
  try {
    if (!token) {
      const [questions, token] = await createSession(amount);      
      res.status(200).json({ questions, token });         
    } else {
      const questions = await resumeSession(amount, token);
      res.status(200).json({ questions, token });
    }    
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getSession
}