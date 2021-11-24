import mongoose from "mongoose";

const employees = new mongoose.Schema({
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


  export default employees