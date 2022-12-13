const {HojaDeCargoModel} = require('../models/hojaDeCargos');

module.exports = {
    get: async (req, res) => {
        const egresos = await HojaDeCargoModel.find()

        res.status(200).json(egresos)
    },
    create: async (req, res) => {
        const { fecha, codigo, idEmbarazada, idUsuario } = req.body

        const hojaCargo = await HojaDeCargoModel.create({
            fecha,
            codigo,
            idEmbarazada,
            idUsuario
        })

        res.status(200).json(hojaCargo)
    }
}