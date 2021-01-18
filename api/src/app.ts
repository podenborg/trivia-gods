import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import express from "express";
import * as dotenv from "dotenv";

import indexRouter from "./routes/index";
import sessionsRouter from "./routes/sessions";

import { notFoundHandler, errorHandler } from "./middleware"

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT || 3000);

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/review-session', sessionsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});

process.on('uncaughtException', (error) => {
  console.log(error);
}); 

module.exports = app;