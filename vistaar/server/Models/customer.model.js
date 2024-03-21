const mongoose = require("mongoose");


const customerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    accounts: [{ type: Number, required: true }],
    //   tier_and_details: { type: Map, of: tierDetailsSchema }
  });
  

  
const customerModel = mongoose.model("customer", customerSchema);

module.exports = {customerModel};