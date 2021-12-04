import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcrypt";
import jwt from "JsonWebToken";
import { jwtSecret, jwtExpire } from "./config/dev.js";
import dotenv from "dotenv";
import employeesRoutes from "./routes/employees.js";
import nominationsRoutes from "./routes/nominations.js";
import bodyParser from "body-parser";
import winnersRoutes from "./routes/winners.js";
//import getresetpasswprdtoken from "./config/resetpasswordtoken.js"
import sendEmail from "./config/sendEmail.js";
import crypto from "crypto";

const Schema = mongoose.Schema;

const app = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 9009;
app.listen(PORT, () => {
  console.log(`Apllication started at port ${PORT}`);
});

//Doing Connection
mongoose
  .connect(process.env.Mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB is not connected", err);
  });

//Schema Defination
const employee1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: String,
  department: String,
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  password: { type: String },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


//Collection creation
//Employee will be name of document and it will become "employees" in DB
const Employee = new mongoose.model("Employee", employee1);

app.use("/employees", employeesRoutes);
app.use("/employees/details", employeesRoutes);
app.use("/employees/password", employeesRoutes);
app.use("/nominations", nominationsRoutes);
app.use("/winners", winnersRoutes);

//get Employees
app.get("/manage", async (req, res) => {
  const ManagerList = await Employee.find(
    { designation: "Manager" },
    { name: 1 }
  );
  try {
    if (!ManagerList) {
      res.send({ message: "No Manager Exist Yet" });
    } else {
      res.send(ManagerList);
    }
  } catch (err) {
    console.log("Mangers in err: ", err);
    res.send({ message: "Mangers Server Error " });
  }
});

// app.get("/mangersDetails/:id", async(req,res)=>{
//   Employee.find({manager?._id : req.params.id}).populate("manager").exec((err,result)=>{
//     if(err){
//       res.send("error for manager details");
//     }
//     else{
//       res.send(result);
//     }
//   })
// })

//get all emp list
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
 
  const user = await Employee.findOne({ email });

  let isMatch;
  if (user) {
    isMatch = await bcrypt.compare(password, user.password);
  } else {
    isMatch = false;
  }

  try {
    if (!user) {
      //  console.log("This is in if response", user);
      res.send({ message: "Please enter valid credentials" });
    } else if (!isMatch) {
      //   console.log("This is in else if response", user);
      res.send({ message: "Please enter valid credentials" });
    } else {
      const payload = {
        user: {
          _id: user._id,
        },
      };

      const createToken = async () => {
        const token = jwt.sign(payload, jwtSecret, {
          expiresIn: jwtExpire,
        });
        const { _id, name, designation } = user;
        res.send({
          token,
          user: { _id, name, designation },
          message: "Login Successfull",
        });
      };
      createToken();
    }
  } catch (err) {
    console.log("sign in err: ", err);
    res.send({ message: "Server Error " });
  }
});


//working send password link
app.post("/forgotPassword", async (req, res) => {
  const user = await Employee.findOne({ email: req.body.email });

  if (!user) {

    res.status(208).json({ success: false,  message:"Email not found",});
   // res.send({ message: "Email not found" });
  }

  const resettoken = crypto.randomBytes(20).toString("hex");

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  const resetPasswordExpire = Date.now() + 15 * 24 * 60 * 1000;

  await Employee.updateOne(
    { email: req.body.email },
    { resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: resetPasswordExpire,
    },
    { upsert: false }
  );

  const resetPasswordUrl = `http://localhost:3000/password/reset/${resettoken}`;

  const message = `Your password reset link is :- \n\n ${resetPasswordUrl}\n\n If you have not request this mail then please ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password reset`,
      message,
    });

    res.status(200).json({ success: true,  message: `Email send to ${user.email}`,});
 
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return error;
  }
});









export default Employee;
