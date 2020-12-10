require("dotenv").config();
const db = require("../models/index.js");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (username, password, callback) => {
	let response = { logged: false, message: "invalid username or password" };
	console.log("login process...");
	if (username && password) {
		let user_pass_match = await db.pelanggan.findOne({
			where: {
				username: username,
			},
		});
		user_pass_match =
			user_pass_match &&
			(await bcrypt.compare(password, user_pass_match.password));
		if (!user_pass_match) {
			response = {
				message: "invalid username or password",
				logged: false,
				isAdmin: false,
			};
		} else {
			const isAdmin = await db.admin.findOne({
				where: {
					username: username,
					password: password,
				},
			});

			response = {
				message: "succesfully logged in",
				logged: true,
				isAdmin: isAdmin != null,
			};

			const token = await jwt.sign(
				{
					admin: response.isAdmin,
					username: username,
				},
				process.env.SECRET_KEY,
				{ expiresIn: "720h" }
			);

			response["token"] = token;
		}
	}
	callback(response);
};

module.exports.login = login;

function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const register = async (data, callback) => {
	const checker = [
		"username",
		"password",
		"nama_pelanggan",
		"id_tarif",
		"alamat",
	];
	let dataIsComplete = true;
	let result = {
		registered: true,
		message: "succesfully registered",
	};
	// checking if data is complete using for loop
	for (var i = 0; i < 5; i++)
		dataIsComplete =
			data[checker[i]] != "" &&
			data[checker[i]] != null &&
			dataIsComplete;
	if (dataIsComplete) {
		const usernameIsTaken = await db.pelanggan.findOne({
			where: {
				username: data.username,
			},
		});
		if (usernameIsTaken) {
			result = {
				registered: false,
				message: "username taken",
			};
		} else {
			let nomorKwhIsTaken, nomor_kwh;
			const hashedPassword = await bcrypt.hashSync(data.password, 7);
			// generating random number for the nomor_kwh
			// check if the number is already used, if the number is already used then pick another random number
			// else use the number and insert it into database
			do {
				nomor_kwh = await generateRandomNumber(1000000000, 9999999999);
				nomorKwhIsTaken = await db.pelanggan.findOne({
					where: {
						nomor_kwh: nomor_kwh,
					},
				});
			} while (nomorKwhIsTaken);
			data["nomor_kwh"] = nomor_kwh;
			data.password = hashedPassword;
			await db.pelanggan.create(data);
			const dataPelanggan = await db.pelanggan.findOne({
				where: { username: data.username },
			});
			const awal = generateRandomNumber(100, 1000),
				akhir = generateRandomNumber(1001, 100000);
			await db.penggunaan.create({
				id_pelanggan: dataPelanggan.id_pelanggan,
				bulan: "sekarang",
				tahun: "sekarang",
				meter_awal: awal,
				meter_akhir: akhir,
				id_penggunaan: dataPelanggan.id_pelanggan,
			});
			await db.tagihan.create({
				id_penggunaan: dataPelanggan.id_pelanggan,
				bulan: "sekarang",
				tahun: "sekarang",
				jumlah_meter: akhir - awal,
				status: "BELUM DIBAYAR",
				id_tagihan: dataPelanggan.id_pelanggan,
			});
		}
	} else {
		result = {
			registered: false,
			message: "data incomplete",
		};
	}
	callback(result);
};

module.exports.register = register;
