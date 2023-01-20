const { EgresoModel } = require('../models/egresos')
const { EmbarazadasModel } = require('../models/embarazada');

module.exports = {
    get: async (req, res) => {
        const egresos = await EgresoModel.find().populate('idEmbarazada')
        res.status(200).json(egresos)
    },
    create: async (req, res) => {
        const { fechaEgreso, motivo, sala, cama, idEmbarazada, idUsuario } = req.body

        const egresoExte = await EmbarazadasModel.findById(idEmbarazada)
        if (!egresoExte) {
            const egreso = await EgresoModel.create({
                fechaEgreso,
                motivo,
                sala,
                cama,
                idEmbarazada,
                idUsuario
            })
            res.status(200).json(egreso)
        } else {
            res.status(200).json({ error: "Embarazada existente en egreso" })
        }

    },
    getPorFechaSalaCarnet: async (req, res) => {
        const { fecha, sala } = req.body
        let egresos = await EgresoModel.find({ fecha, sala }).populate('idEmbarazada')

        res.status(200).json(egresos)
    },
    getPorCarnet: async (req, res) => {
        const { fecha, sala, ci } = req.body
        let egresos = await EgresoModel.find().populate('idEmbarazada')

        for (const egreso of egresos) {
            if (egreso.idEmbarazada.Carnet_Identidad === ci) {
                egresos = egreso
            }
        }
        res.status(200).json(egresos)
    },
    update: async (req, res) => {
        const { id, fechaEgreso, motivo, sala, cama } = req.body

        let egreso = await EgresoModel.findByIdAndUpdate(id, {
            fechaEgreso,
            motivo,
            sala,
            cama,
        })
        res.status(200).json(egreso)
    }
}