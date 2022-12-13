const {EgresoModel} = require('../models/egresos')

module.exports = {
    get: async (req, res) => {
        const egresos = await EgresoModel.find()
        res.status(200).json(egresos)
    },
    create: async (req, res) => {
        const { fechaEgreso, motivo, sala, cama, idEmbarazada, idUsuario } = req.body

        const egreso = await EgresoModel.create({
            fechaEgreso,
            motivo,
            sala,
            cama,
            idEmbarazada,
            idUsuario
        })
        res.status(200).json(egreso)
    }
}