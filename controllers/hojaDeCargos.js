const HojaModel = require('../models/hojaDeCargos');

module.exports = {
    get: async (req, res) => { 
        const egresos = await HojaModel.find()

        res.status(200).json(egresos)
    }
}