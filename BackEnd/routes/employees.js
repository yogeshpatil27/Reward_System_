import express from "express";
import bcrypt from "bcrypt";
//import Employee from '../model/employee.js';
import Employee from "../app.js";
import mongoose from "mongoose";
import crypto from "crypto";
import sendEmail from "../config/sendEmail.js";

const router = express.Router();

//Get All Employees
router.get("/", async (req, res) => {
  try {
    const emp = await Employee.find();
    //    res.json(emp);
    res.send(emp);
  } catch (err) {
    res.send(err);
  }
});

//Get Employee by ID to for nominate form
router.get("/:id", async (req, res) => {
  Employee.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// For Manager get His Employees
router.get("/mangersDetails/:id", async (req, res) => {
  Employee.find({ manager: req.params.id })
    .populate("manager")
    .exec((err, result) => {
      if (err) {
        res.send("error for manager details");
      } else {
        res.send(result);
      }
    });
});

//All Employees for Admin Employee Details Table
router.get("/employe/mangersDetails", async (req, res) => {
  const EmpDetails = Employee.find({ designation: { $ne: "Admin" } })
    .populate("manager")
    .exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

//Edit employee for Admin Edit page
router.put("/", async (req, res) => {
  const user = req.body;
  const editUser = new Employee(user);

  Employee.findOne({ email: user.email }, async (err, result) => {
    if (result) {
      res.send({ success: false, message: "Email already registered" });
    }
  });

  try {
    await Employee.updateOne({ _id: user._id }, editUser);
    res.send({ success: true, message: "User updated successfully", editUser });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Working reset password
router.put("/reset/:token", async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Employee.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  try {
    if (!user) {
      res
        .status(208)
        .json({ success: false, message: "Link not valid, please reset link" });
    }

    if (req.body.password !== req.body.confirmPassword) {
      res.status(208).json({ success: false, message: "Password not matched" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    //user.password= req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password changed succesfully" });
  } catch (err) {
    res
      .status(208)
      .json({
        success: false,
        message: "Generated error while resetting password",
        err,
      });
  }
});

//Register New Employee for Admin Register Page
router.post("/", async (req, res) => {
  const { name, email, designation,  department,manager, password} = req.body;


  Employee.findOne({ email:req.body.email }, async (err, user) => {
    if (user) {
      return res.status(208).json({
        success: false,
        message: "Email already registered",
      });
    }
    if (!manager) {
        const Emp = new Employee({
          name,
          email,
          designation,
          department,
          password,
        });


        const salt = await bcrypt.genSalt(10);
        Emp.password = await bcrypt.hash(password, salt);

        const message = `Your are registered as employee in organisation:- \n\n Please follow link to login to Reward and Recognition System(R&R) :- http://localhost:3000/ \n\n Login with password:  ${password} \n\n We recommend you to change the password after login`;

        await sendEmail({
          email:email,
          subject: `Registration in reward and registration system`,
          message,
        });

        Emp.save()
          .then(() => {
            res
              .status(200)
              .json({ success: true, message: "Successfully registered" });
          })
          .catch((err) => {
            console.log("Error Message while Saving in DB: " + err);
          });
      } else {
        const Emp = new Employee({
          name,
          email,
          designation,
          department,
          manager,
          password,
        });

        const salt = await bcrypt.genSalt(10);
        Emp.password = await bcrypt.hash(password, salt);

        const message = `Your are registered as employee in organisation:- \n\n Please follow link to login to Reward and Recognition System(R&R) :- http://localhost:3000/ \n\n Login with password:  ${password} \n\n We recommend you to change the password after login.`;

        await sendEmail({
          email:email,
          subject: `Registration in reward and registration system`,
          message,
        });

        Emp.save()
          .then(() => {
            res
              .status(200)
              .json({ success: true, message: "Successfully registered" });
          })
          .catch((err) => {
            console.log("Error Message while Saving in DB: " + err);
          });
      }
    })
 
});

//Delete Employee for Admin Page
router.delete("/:id", async (req, res) => {
  const emp = await Employee.deleteOne({
    _id: mongoose.mongo.ObjectId(req.params.id),
  });
  res.send("deleted Succesfull");
});

export default router;
