import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelations = (req, res) => {
	const q = "select followerUserId from relationships where followedUserId = ?";

	db.query(q, [req.query.followedUserId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res
			.status(200)
			.json(data.map((relationship) => relationship.followerUserId));
	});
};

export const addRelation = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(403).json("Token not valid");
		const q =
			"insert into relationships (`followerUserId`, `followedUserId`) values (?)";

		const vals = [userData.id, req.body.userId];
		if (userData.id === req.body.userId)
			return res.status(500).json("Cannot follow your self");

		db.query(q, [vals], (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json("Following");
		});
	});
};

export const removeRelation = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(403).json("Token not valid");

		const q =
			"delete from relationships where `followerUserId` =? and `followedUserId` =?";

		const vals = [userData.id, req.query.userId];
		db.query(q, vals, (err, data) => {
			console.log(vals);
			if (err) return res.status(500).json(err);
			return res.status(200).json("Unfollowed");
		});
	});
};
