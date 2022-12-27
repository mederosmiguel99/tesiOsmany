const { HojaDeCargoModel } = require('../models/hojaDeCargos');
const moment = require('moment');

module.exports = {
    get: async (req, res) => {
        const egresos = await HojaDeCargoModel.find().populate('idEmbarazada')

        res.status(200).json(egresos)
    },
    create: async (req, res) => {
        const { fecha, codigo, idEmbarazada, idUsuario } = req.body

        const hojaCargo = await HojaDeCargoModel.create({
            fecha: moment(fecha, "YYYY/MM/DD"),
            codigo,
            idEmbarazada,
            idUsuario
        })

        res.status(200).json(hojaCargo)
    },
    getPorFechaSalaCarnet: async (req, res) => {
        let { fecha1, fecha2, ci } = req.body
        fecha1 = new Date(fecha1.split('/')[0], fecha1.split('/')[1] * 1 - 1, fecha1.split('/')[2])
        fecha2 = new Date(fecha2.split('/')[0], fecha2.split('/')[1] * 1 - 1, fecha2.split('/')[2])
        let hojaCargos = await HojaDeCargoModel.find({ fecha: { $gte: fecha1 }, fecha: { $lte: fecha2 } }).populate('idEmbarazada')

        for (const hojaCargo of hojaCargos) {
            if (hojaCargo.idEmbarazada.Carnet_Identidad === ci) {
                hojaCargos = hojaCargo
            }
        }

        res.status(200).json(hojaCargos)
    },
    update: async (req, res) => {
        const { id, fecha, codigo} = req.body
        
        let egreso = await HojaDeCargoModel.findByIdAndUpdate(id, {
            fecha: moment(fecha, "YYYY/MM/DD"),
            codigo,
        })
        res.status(200).json(egreso)
    }
}