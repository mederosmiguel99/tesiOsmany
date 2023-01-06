const { response } = require('express')
const { Users } = require('../models/users');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generateJWT');


module.exports = {
    async login(req, res = response) {
        const { registroMedico, password } = req.body;
        try {
            // verificar si el correo existe
            const user = await Users.findOne({ registroMedico })
            if (!user) {
                return res.status(400).json({
                    msg: 'El usuario / password no son validos',
                })
            }
            // verificar la contraseña
            const ValidPassword = bcryptjs.compareSync(password, user.password);
            if (!ValidPassword) {
                res.status(400).json({
                    msg: 'Usuario/ Password no son correctos',
                })
            }
            //generar JWT
            const token = await generarJWT(user._id)

            res.json(
                {
                    user,
                    token
                }
            )
        } catch (error) {
            return res.status(500).send({
                msg: 'Internal server error'
            })
        }

    },
    async register(req, res = response) {
        const { name, registroMedico, password, tipo } = req.body;
        try {
            // verificar si el correo existe
            let user = await Users.findOne({ registroMedico })
            if (user) {
                return res.status(400).json({
                    msg: 'El usuario ya existe',
                })
            }
            // generate password encripted
            const salt = bcryptjs.genSaltSync();
            user = await Users.create({
                name,
                registroMedico,
                password: bcryptjs.hashSync(password, salt),
                tipo
            })

            // generar JWT
            const token = await generarJWT(user._id)

            res.json(
                {
                    user,
                    token
                }
            )
        } catch (error) {
            // res.status(500).send({
            //     msg: 'Internal server error'
            // })
            throw new Error(error)
        }

    },
}