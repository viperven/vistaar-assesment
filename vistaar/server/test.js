//this files is for testing that has alll backend code in one file u can use this for testing...


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0/test")
  .then(() => {
    console.log("mongodb connection successful");
  })
  .catch((err) => {
    console.log("error in connection");
  });

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true },
  accounts: [{ type: Number, required: true }],
  //   tier_and_details: { type: Map, of: tierDetailsSchema }
});

const transactionSchema = new mongoose.Schema({
  account_id: Number,
  transaction_count: Number,
  bucket_start_date: Date,
  bucket_end_date: Date,
  transactions: [
    {
      date: Date,
      amount: Number,
      transaction_code: String,
      symbol: String,
      price: Number,
      total: Number,
    },
  ],
});

const accountsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  account_id: Number,
  limit: Number,
  products: [{
    type: String
  }]
});

const customerModel = mongoose.model("customer", customerSchema);
const transactionModel = mongoose.model("transactions", transactionSchema);
const accountModel = mongoose.model("accounts", accountsSchema);

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
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 3000!");
});
