const Expense = require("../model/Expense");

   //Add Expense code
 const addExpense = async(req,res)=>{
  try {
    const expense = await Expense.create({...req.body, userId: req.userId});
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server error"});
  }
 };

 //Get Expense code
   const getExpense =async(req,res)=>{
    try {
      const expense = await Expense.find({userId: req.userId});
      if(!expense){
        return res.status(404).json({message:"Expense not found"});
      }
      res.status(200).json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({message:"Server error"});
    }
   };

   module.exports = { addExpense, getExpense};

