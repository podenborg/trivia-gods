import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
const router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.query;
    if (!amount) throw new Error("Did not receive a valid 'amount' query parameter.");

    const tokenRes = await axios(`${process.env.OPEN_TRIVIA_URL}/api_token.php?command=request`);
    const { token, response_code } = tokenRes?.data;
    if (response_code !== 0) throw new Error("Could not generate session token.");

    const questionRes = await axios(`${process.env.OPEN_TRIVIA_URL}/api.php?amount=${amount}&category=20&token=${token}`);
    const { results: questions } = questionRes.data;
    if (!questions) throw new Error("Could not fetch questions.");
    
    res.status(200).json({
      questions,
      token
    }); 
  } catch (error) {
    res.status(400).send(error.message);
  }  
});

export default router;