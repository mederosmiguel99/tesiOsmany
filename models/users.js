const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    fullName: {
        type: String,
        required: [true, 'Hay que especificar el nombre y y apellidos']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    movil: {
        type: String,
        required: [true, 'El numero del movil es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
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