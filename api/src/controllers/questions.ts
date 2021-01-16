import { Request, Response, NextFunction } from "express";
// import sessionsService from "../services/sessions";

// const { createSession, resumeSession } = questionsService;

export const saveQuestions = async (req: Request, res: Response, next: NextFunction) => {    
  // const amount = req.query.amount as string;
  // const token = req.query.token as string;
  try {
    const { questions, token } = req.body;
    console.log("QUESTIONS FROM APP:", questions);
    // if (!token) {
    //   const [questions, token] = await createSession(amount);      
    //   res.status(200).json({ questions, token });         
    // } else {
    //   const questions = await resumeSession(amount, token);
    //   res.status(200).json({ questions, token });
    // }    
    res.send("I got your questions!");
  } catch (error) {
    res.status(400).send(error.message);
  }
};