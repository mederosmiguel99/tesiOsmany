const egresosModel = require('../models/egresos')

module.exports = {
    get: async (req, res) => {
        const egresos = await egresosModel.find()

        res.status(200).json(egresos)
    }
}