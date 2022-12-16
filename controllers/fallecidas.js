const { FallecidasModel } = require('../models/fallecidas');

module.exports = {
  get: async (req, res) => {
    //  const {fallecidasId, embarazadaId} = req.body
    let fallecidas = await FallecidasModel.find().populate('idEmbarazada')
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
  },
  getPorFechaSalaCarnet: async (req, res) => {
    const { fecha, sala } = req.body
    let fallecidas = await FallecidasModel.find({ fecha, sala }).populate('idEmbarazada')

    res.status(200).json(fallecidas)
  },
  getPorCarnet: async (req, res) => {
    const { ci } = req.body
    let fallecidas = await FallecidasModel.find().populate('idEmbarazada')

    for (const fallecida of fallecidas) {
      if(fallecida.idEmbarazada.Carnet_Identidad === ci) {
        fallecidas = fallecida
      }
    }

    res.status(200).json(fallecidas)
  }
}

