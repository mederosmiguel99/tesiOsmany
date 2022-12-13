const {FallecidasModel} = require('../models/fallecidas');

module.exports = {
    get: async (req, res) => {
      //  const {fallecidasId, embarazadaId} = req.body
        let fallecidas = await FallecidasModel.find()
        res.status(200).json((fallecidas));
    },
}

