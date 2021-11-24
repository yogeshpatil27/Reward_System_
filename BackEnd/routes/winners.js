import express, { response } from "express";
import mongoose from "mongoose";
import winners from "../model/winners.js";

const router = express.Router();
const Wins= new mongoose.model("Winner", winners);

router.post("/", async (req, res) => {
    const {
      //_id,
      fullName,
      designation,
      nominatedBy,
      department,
      Months,
    } = req.body;
  
    Wins.findOne({Months:Months},async(err,result)=>{
      if(result){
        res.send({message:"Winner Already Declaired for this month"})
      }
      else{
        const win = new Wins({
        //  _id,
            fullName,
            designation,
            nominatedBy,
            department,
            Months,
          });
  
       await win
       .save()
       .then(() => {
         res.send({ message: "Succesfully Declaired Winner" });
       })
       .catch((e) => {
         console.log("Error occures while Declairing Winner", e);
       });
  
      }
    } )
  });




  router.get("/", async (req, res) => {
    try {
      const win = await Wins.find();
      //    res.json(emp);
      res.send(win);
    } catch (err) {
      res.send(err);
    }
  });
  
  export default router;