const mongoose = require("mongoose");
const listtSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    enum: ["Lo tengo en casa", "Para Comrar"] 
},
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productos",
    },
  ],
});
const listtModel = mongoose.model('list', listSchema);
module.exports = listModel