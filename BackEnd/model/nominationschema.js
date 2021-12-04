import mongoose from "mongoose";

const Schema=mongoose.Schema;

const nominations = new mongoose.Schema({
    //_id:Schema.Types.ObjectId,
  fullName: String,
  designation: String,
  nominatedBy: String,
  criteria: {
    type: Array,
  },
  department: String,
  praise: String,
  likes: [ {type: Schema.Types.ObjectId,
    ref:'employees',}],
  dislikes:[ {type: Schema.Types.ObjectId,
    ref:'employees',}],
    Months:Date,
});

const Nominated = new mongoose.model("Nomination", nominations);

export default Nominated