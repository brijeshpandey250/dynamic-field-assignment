const mongoose = require('mongoose');

const DynamicFieldSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('dynamic_field', DynamicFieldSchema);
