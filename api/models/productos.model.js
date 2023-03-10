const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
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

const productosModel = mongoose.model('productos', productosSchema)

module.exports = productosModel