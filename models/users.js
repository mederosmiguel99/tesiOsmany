const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    registroMedico: {
        type: String,
        required: [true, 'Hay que especificar el registro medico']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    tipo: {
        type: String,
        required: [true, 'El campo tipo es obligatorio'],
    }
});

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user;
}

const Users = mongoose.model('users', userSchema);

module.exports = {
    Users
}