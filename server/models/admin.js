const mongoose = require("mongoose");
const schema1 = new mongoose.Schema({
	name: String,
	email: String,
	cnfPassword: String,
});

const Admin = mongoose.model("user", schema1);

module.exports = Admin;
