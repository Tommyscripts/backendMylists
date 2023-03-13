const mongoose = require("mongoose");
const ListSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    enum: ["Lo tengo en casa", "Para Comrar","Todos los productos"] 
},
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productos",
    },
  ],
});
const ListModel = mongoose.model('list', ListSchema);
module.exports = ListModel