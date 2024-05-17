import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
	const q = "select * from users where username = ?";
	db.query(q, [req.body.username], (err, data) => {
		if (err) return res.status(500).json(err);
		if (data.length) return res.status(409).json("User already exists");

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const q =
			"insert into users (`username`, `email`, `password`, `name`) values (?,?,?,?)";
		const vals = [req.body.username, req.body.email, hash, req.body.name];
		db.query(q, vals, (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json("User created successfully");
		});
	});
};

export const login = (req, res) => {
	const q = "select * from users where username = ?";
	const username = req.body.username;
	db.query(q, username, (err, data) => {
		if (err) return res.status(500).json(err);
		if (!data.length) return res.status(404).json("User not found");
		else {
			const match = bcrypt.compareSync(req.body.password, data[0].password);
			if (!match) return res.status(401).json("Incorrect password");

			const token = jwt.sign({ id: data[0].id }, "secretkey");
			const { password, ...otherInfo } = data[0];
			res
				.cookie("accessToken", token, {
					httpOnly: true,
				})
				.status(200)
				.json(otherInfo);
		}
	});
};

export const logout = (req, res) => {
	res
		.clearCookie("accessToken", {
			secure: true,
			sameSite: "none",
		})
		.status(200)
		.json("Logged out successfully");
};
