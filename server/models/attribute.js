const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema({
  attribute: String,
  googleid: String,
});

// compile model from schema
module.exports = mongoose.model("attribute", AttributeSchema);
