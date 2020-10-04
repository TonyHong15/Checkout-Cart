const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  label: {type: String, required: true,},
  price: {type: Number, required:true},
}, {
  timestamps: true,
});

const item = mongoose.model('item', itemSchema);

module.exports = item;