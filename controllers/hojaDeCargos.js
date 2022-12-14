const { HojaDeCargoModel } = require('../models/hojaDeCargos');

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
    },
    getPorFechaSalaCarnet: async (req, res) => {
        const { fecha1, fecha2, ci } = req.body
        let hojaCargos = await HojaDeCargoModel.find({ fecha: { gte: fecha1 }, fecha: { lte: fecha2 } }).populate('idEmbarazada')

        for (const hojaCargo of hojaCargos) {
            if (hojaCargo.idEmbarazada.Carnet_Identidad === ci) {
                hojaCargos = hojaCargo
            }
        }

        res.status(200).json(hojaCargos)
    }
}