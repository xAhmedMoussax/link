import express from "express";
import {
	getRelations,
	addRelation,
	removeRelation,
} from "../controllers/relationships.js";

const router = express.Router();

router.get("/", getRelations);
router.post("/", addRelation);
router.delete("/", removeRelation);

export default router;
