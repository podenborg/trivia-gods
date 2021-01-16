import { sessions } from "../controllers";
import express from "express";

const router = express.Router();

/* GET review session */
router.get('/', sessions.handleGetSession);

/* POST review session */
router.post('/', sessions.handleSaveSession);

export default router;