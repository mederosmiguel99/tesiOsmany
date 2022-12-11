const ingresoModel = require('../models/ingresos');

module.exports = {
    get: async (req, res) => {
        const egresos = await ingresoModel.find()

        res.status(200).json(egresos)
    }
}