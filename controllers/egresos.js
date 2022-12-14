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
    },
    getPorFechaSalaCarnet: async (req, res) => {
        const { fecha, sala, ci } = req.body
        let egresos = await EgresoModel.find({ fecha, sala }).populate('idEmbarazada')

        for (const egreso of egresos) {
            if (egreso.idEmbarazada.Carnet_Identidad === ci) {
                egresos = egreso
            }
        }

        res.status(200).json(egresos)
    }
}