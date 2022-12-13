const {IngresoModel} = require('../models/ingresos');
const {EmbarazadasModel} = require('../models/embarazada');

module.exports = {
    get: async (req, res) => {
        const egresos = await IngresoModel.find()

        res.status(200).json(egresos)
    },
    create: async (req, res) => {
        const { fechaDeingreso, diagnostico, sala, cama, escolaridad, estadoConyugal, habitosToxicos, nombrePadre, padreFallecido,
            nombreMadre, madreFallecida, nombreEmergencia, telefonoEmergencia, idEmbarazada, idUsuario } = req.body

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
                madreFallecida,
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

    }
}