const { IngresoModel } = require('../models/ingresos');
const { EmbarazadasModel } = require('../models/embarazada');

module.exports = {
    get: async (req, res) => {
        const egresos = await IngresoModel.find().populate('idEmbarazada')

        res.status(200).json(egresos)
    },
    create: async (req, res) => {
        const { fechaDeingreso, diagnostico, sala, cama, escolaridad, estadoConyugal, habitosToxicos, nombrePadre, padreFallecido,
            nombreMadre, madreingreso, nombreEmergencia, telefonoEmergencia, idEmbarazada, idUsuario } = req.body

        const embarazada = await EmbarazadasModel.findById(idEmbarazada)
        if (embarazada) {
                const ingreso = await IngresoModel.create({
                    fechaDeingreso,
                    diagnostico,
                    sala,
                    cama,
                    escolaridad,
                    estadoConyugal,
                    habitosToxicos,
                    nombrePadre,
                    padreFallecido,
                    nombreMadre,
                    madreingreso,
                    nombreEmergencia,
                    telefonoEmergencia,
                    idEmbarazada,
                    idUsuario
                })
                res.status(200).json(ingreso)
        }
        else {
            res.status(401).json({ err: "Embarazada no encontrada" })
        }
    },
    getPorFechaSalaCarnet: async (req, res) => {
        const { fecha, sala } = req.body
        let ingresos = await IngresoModel.find({ fecha, sala }).populate('idEmbarazada')

        res.status(200).json(ingresos)
    },
    getPorCarnet: async (req, res) => {
        const { ci } = req.body
        let ingresos = await IngresoModel.find().populate('idEmbarazada')

        for (const ingreso of ingresos) {
            if (ingreso.idEmbarazada.Carnet_Identidad === ci) {
                ingresos = ingreso
            }
        }

        res.status(200).json(ingresos)
    },
    update: async (req, res) => {
        const { id, fechaDeingreso, diagnostico, sala, cama, escolaridad, estadoConyugal, habitosToxicos, nombrePadre, padreFallecido,
            nombreMadre, madreingreso, nombreEmergencia, telefonoEmergencia } = req.body

        let egreso = await IngresoModel.findByIdAndUpdate(id, {
            fechaDeingreso,
            diagnostico,
            sala,
            cama,
            escolaridad,
            estadoConyugal,
            habitosToxicos,
            nombrePadre,
            padreFallecido,
            nombreMadre,
            madreingreso,
            nombreEmergencia,
            telefonoEmergencia
        })
        res.status(200).json(egreso)
    }
}