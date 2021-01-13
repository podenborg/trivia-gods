import sessions from "../controllers/sessions";
import express from "express";

const router = express.Router();

/* GET review session */
router.get('/', sessions.getSession);

export default router;