import mongoose from "mongoose";
import express, { response } from "express";

const Schema = mongoose.Schema;
const winners = new mongoose.Schema({
 // _id: Schema.Types.ObjectId,
  fullName: String,
  designation: String,
  nominatedBy: String,
  department: String,
  Months: Date,
});

export default winners;
