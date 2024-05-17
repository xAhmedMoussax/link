import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
	const q = "select userId from likes where postId = ?";

	db.query(q, [req.query.postId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data.map((like) => like.userId));
	});
};

export const addLike = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(403).json("Token not valid");
		const q = "insert into likes (`userId`, `postId`) values (?)";

		const vals = [userData.id, req.body.postId];

		db.query(q, [vals], (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json("like added");
		});
	});
};

export const removeLike = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(403).json("Token not valid");

		const q = "delete from likes where `userId` =? and `postId` =?";

		const vals = [userData.id, req.query.postId];
		db.query(q, vals, (err, data) => {
			console.log(vals);
			if (err) return res.status(500).json(err);
			return res.status(200).json("like removed");
		});
	});
};
