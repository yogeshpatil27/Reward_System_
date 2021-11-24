import express from "express";
import bcrypt from "bcrypt";
//import employees from '../model/employee.js';
import Employee from "../app.js";
import mongoose from "mongoose";

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
  const EmpDetails = Employee.find({designation:{$ne:"Admin"}}).populate('manager').exec((err,result)=>{
   if(err){
     res.send(err)
   }
   else{
     res.send(result)
   }
  })   
});

//Edit employee for Admin Edit page
router.put("/", async (req, res) => {
  const user = req.body;
  const editUser = new Employee(user);
  try {
    await Employee.updateOne({ _id: user._id }, editUser);
    res.send(editUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Register New Employee for Admin Register Page
router.post("/", async (req, res) => {
  const { name, email, designation, department, manager, password } = req.body;

  Employee.findOne({ email: email }, async (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
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

        Emp.save()
          .then(() => {
            res.send({ message: "SucessFully Register" });
          })
          .catch((e) => {
            console.log("Error Message while Saving in DB: " + e);
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

        Emp.save()
          .then(() => {
            res.send({ message: "SucessFully Register" });
          })
          .catch((e) => {
            console.log("Error Message while Saving in DB: " + e);
          });
      }
    }
  });
});

//Delete Employee for Admin Page
router.delete("/:id", async (req, res) => {
  const emp = await Employee.deleteOne({
    _id: mongoose.mongo.ObjectId(req.params.id),
  });
  res.send("deleted Succesfull");
});

export default router;
