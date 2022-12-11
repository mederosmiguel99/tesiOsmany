const mongoose = require('mongoose');
const { Schema } = mongoose;

const hojaDeCargoSchema = Schema({
    fecha: {
        type: String,
        required: [false]
    },
    idEmbarazada: {
        type: String,
        required: [false]
    },
    idUsuario: {
        type: String,
        required: [false]
    },   
    
});

hojaDeCargoSchema.methods.toJSON = function () {
    const { __v, password, _id, ...hojaDeCargo } = this.toObject();
    hojaDeCargo.uid = _id
    return hojaDeCargo;
}

const HojaDeCargoModel = mongoose.model('solicitudes', hojaDeCargoSchema);

module.exports = {
    HojaDeCargoModel
}