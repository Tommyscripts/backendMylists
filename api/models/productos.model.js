const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categorias: {
        type: String,
        required: true,
        enum: ["Carnes", "Pescados", "Congelados", "Arroces", "Lacteos y huevos", "Pasta", "Verduras", "Frutas", "Embutidos", "Panaderia", "Frutos secos", "Salsas", "Encurtidos", "Café y azúcar", "Bollería", "Limpieza"]
    }
})

const ProductsModel = mongoose.model('productos', productsSchema)

module.exports = ProductsModel