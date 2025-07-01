import express from 'express'
import { subscribeNewsletter } from '../controllers/newsLetterController.js';

const newsLetterRouter = express.Router();

newsLetterRouter.post("/subscribe", subscribeNewsletter);

export default newsLetterRouter;