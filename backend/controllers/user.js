import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
	const userId = req.params.userId;
	const q = "select * from users where id =?";
	db.query(q, userId, (err, data) => {
		if (err) return res.status(500).json(err);
		const { password, ...userData } = data[0];
		return res.json(userData);
	});
};
export const updateUser = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("User not logged in");

	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) return res.status(500).json("Token not valid");

		const q =
			"update users set `name`=?, `city`=?, `website`=?,`profilePic`=?,`coverPic`=? where id =?";
		let vals = [
			req.body.name,
			req.body.city,
			req.body.website,
			req.body.profilePic,
			req.body.coverPic,
			userData.id,
		];
		db.query(q, vals, (err, data) => {
			if (err) return res.status(500).json(err);
			if (data.affectedRows > 0)
				return res.status(200).json("Updated Successfully");

			return res.status(403).json("No changes made");
		});
	});
};
