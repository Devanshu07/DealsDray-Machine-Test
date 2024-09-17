const mongoose = require("mongoose");
const schema1 = new mongoose.Schema({
	name: String,
	email: String,
	phone: Number,
	designation: String,
	gender: String,
	image: String,
	course: {
		type: Array,
		default: [],
	},
});

const Employee = mongoose.model("employee", schema1);

module.exports = Employee;
