const { FallecidasModel } = require('../models/fallecidas');

module.exports = {
  get: async (req, res) => {
    //  const {fallecidasId, embarazadaId} = req.body
    let fallecidas = await FallecidasModel.find()
    res.status(200).json((fallecidas));
  },
  create: async (req, res) => {
    const { fecha, causa, sala, cama, idEmbarazada, idUsuario } = req.body

    const fallecida = await FallecidasModel.create({
      fecha,
      causa,
      sala,
      cama,
      idEmbarazada,
      idUsuario
    })
    res.status(200).json(fallecida)
  }
}

