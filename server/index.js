const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");
const multer = require("multer");
const admin = require("./models/admin");
const employee = require("./models/employee");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongo connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
	.once("open", () => {
		console.log("Connected to DB.....");
	})
	.on("error", () => {
		console.log("problem to connect to DB ..!!!!!");
	});

// multer storage configuration
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, "./Images");
	},
	filename: function (req, file, cb) {
		return cb(null, `${Date.now()}-${file.originalname}`);
	},
});
let upload = multer({ storage });

// registration form data handle
app.post("/register", async (req, res) => {
    const user= await admin.findOne({ email: req.body.email });
    try { 
        if(user){
        res.json("email already registered..");
        } 
        else {
        let dataForDB = new admin(req.body);
        dataForDB.save().then((data) => {
                res.json("input stored in DB successfully...");
            })
        .catch((error) => res.json("data can not be saved , problem at saving time...."));
        }
    } 
	catch {
			res.json("registration problem...");
		}
});

//   handling Login Action
app.post("/login", async (req, res) => {
    try {
        const user1= await admin.findOne({ email: req.body.email });
        if(user1){
            if (user.cnfPassword == req.body.password) {
				res.json({ status: "success", id: user._id });
			} else {
				res.json({ status: "fail" });
			}
        }
    }
    catch{
        res.json({ status: "noUser" });
        console.log(error);
    }
});

// respond data to the Dashbord component
app.get("/user/:ID", (req, res) => {
	let ID = req.params.ID;
	admin
		.findOne({ _id: ID })
		.then((e) => {
			res.json(e.name);
		})
		.catch(() => {
			console.log("problem at param get users Express..");
		});
});

// storing create employee form data
app.post("/employees", upload.single("image"), (req, res) => {
	// console.log(req.file, req.files);
	employee
		.findOne({ email: req.body.email })
		.then((user) => {
			if (user !== null) {
				res.json("email already registered..");
			} else {
				let dataForDB = new employee({
					name: req.body.name,
					email: req.body.email,
					phone: req.body.phone,
					designation: req.body.designation,
					gender: req.body.gender,
					course: req.body.course,
					image: req.file.filename,
				});
				dataForDB
					.save()
					.then((data) => {
						res.json("input stored in DB successfully...");
					})
					.catch((error) => res.json("data can not be saved , problem at saving time...."));
			}
		})
		.catch(() => {
			res.json("registration problem...");
		});
});

// respnding employee-list
app.get("/employee-list", (req, res) => {
	employee.find().then((e) => {
		res.send(e);
	});
});

// edit-employee send data
app.get("/employee-list/:ID", (req, res) => {
	let ID = req.params.ID;
	employee
		.findOne({ _id: ID })
		.then((e) => {
			res.send(e);
		})
		.catch(() => {
			res.send("employee not find");
		});
});

// edit-employee update values
app.put("/employee-list/:ID", upload.single("image"), (req, res) => {
	let ID = req.params.ID;
	employee
		.updateOne({ _id: ID }, req.body)
		.then((e) => {
			res.send("successfully updated data");
		})
		.catch(() => {
			res.send("error at Delete API");
		});
});

// delete employee
app.delete("/employee-list/:ID", (req, res) => {
	let ID = req.params.ID;
	employee
		.deleteOne({ _id: ID }, req.body)
		.then(() => {
			res.send("user deleted..");
		})
		.catch(() => {
			res.send("problem at deletion..");
		});
});

app.listen(4001, () => {
	console.log("server listnign at 4001....");
});
