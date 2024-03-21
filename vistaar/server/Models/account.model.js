const mongoose = require("mongoose");


const accountsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    account_id: Number,
    limit: Number,
    products: [{
      type: String
    }]
  });

  const accountModel = mongoose.model("accounts", accountsSchema);

  module.exports = {accountModel};