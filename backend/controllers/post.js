import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(403).json("Token not valid");
		const q = `
			select p.*, u.id as userId, name profilePic from posts as p join users as u on (u.id = p.userId)
			left join relationships as r on (p.userId = r.followedUserId) where r.followerUserId = ? or p.userId = ?
			order by p.createdAt desc
			`;
		db.query(q, [userData.id, userData.id], (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json(data);
		});
	});
};

export const addPost = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(403).json("Token not valid");
		const q =
			"insert into posts (`desc`, `img`, `createdAt`, `userId`) values (?)";

		const vals = [
			req.body.desc,
			req.body.img,
			moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
			userData.id,
		];

		db.query(q, [vals], (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json("Post Created");
		});
	});
};

export const deletePost = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(403).json("Token not valid");
		const q = "delete from posts where `id`=? and `userId`=?";

		const vals = [req.params.is, userData.id];

		db.query(q, vals, (err, data) => {
			if (err) return res.status(500).json(err);
			if (data.affectedRows > 0) return res.status(200).json("Post Deleted");
			return res.status(403).json("You are not allowed to delete this post");
		});
	});
};
