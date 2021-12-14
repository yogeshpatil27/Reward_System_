import express, { response } from "express";
import mongoose from "mongoose";
import Wins from "../model/winners.js";

const router = express.Router();
//const Wins= new mongoose.model("Winner", winners);

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
        res.send({message:"Winner already declaired for selected month"})
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
         res.send({ message: "Winner declaired successfully" });
       })
       .catch((e) => {
         console.log("Error occures while declairing winner", e);
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