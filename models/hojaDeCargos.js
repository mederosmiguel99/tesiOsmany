const mongoose = require('mongoose');
const { Schema } = mongoose;

const hojaDeCargoSchema = Schema({
    fecha: {
        type: Date,
        required: [false]
    },
    codigo: {
        type: String,
        required: [false]
    },
    idEmbarazada: {
        type: Schema.ObjectId,
        ref: 'embarazadas',
        required: [false]
    },
    idUsuario: {
        type: Schema.ObjectId,
        ref: 'users',
        required: [false]
    }, 
    
});

hojaDeCargoSchema.methods.toJSON = function () {
    const { __v, password, _id, ...hojaDeCargo } = this.toObject();
    hojaDeCargo.uid = _id
    return hojaDeCargo;
}

const HojaDeCargoModel = mongoose.model('hojaCargo', hojaDeCargoSchema);

module.exports = {
    HojaDeCargoModel
}