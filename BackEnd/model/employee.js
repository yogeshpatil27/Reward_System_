import mongoose from "mongoose";

const Schema=mongoose.Schema;

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
    manager:{
      type: Schema.Types.ObjectId,
      ref:'employees',
          },
    password: String,
  });

  const Employee = new mongoose.model("Employee", employee1);
  
  export default Employee