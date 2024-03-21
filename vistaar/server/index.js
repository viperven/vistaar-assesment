const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

//connection with mongodb server
require("./connection")

//models 
const {customerModel} = require("./Models/customer.model");
const {transactionModel} = require("./Models/transaction.model");
const {accountModel} = require("./Models/account.model");

app.get("/activeUsers", async (req, res) => {
  let data = await customerModel.find({ active: true });
  res.json(data);
});

app.post("/transactions", async (req, res) => {
  let receivedId = req.body;
  let transactionDetails = await transactionModel.find({
    account_id: receivedId.transactionsId,
  });
  res.json(transactionDetails);
});

//mongoquery to get at least one transaction below the amount 5000
app.get("/idsTransactions",async (req, res) => {
  let data = await transactionModel.aggregate([
    {
      $match: {
        "transactions.amount": { $lt: 5000 }
      }
    },
    {
      $group: {
        _id: "$account_id"
      }
    }
  ])
  res.json(data);
})

// mongo query to list down distinct list of products available in the system
app.get("/differentProducts",async (req,res)=>{
  let data = await accountModel.aggregate([
    { $unwind: "$products" },
    { $group: { _id: "$products" } },
    { $project: { _id: 0, product: "$_id" } }
  ])
   res.json(data);
})


app.get("/", (req, res) => {
  res.send("Backend Working...!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 3000!");
});
