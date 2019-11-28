const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 'Item' is the model name for accessing the schema
module.exports = Item = mongoose.model("item", ItemSchema);
