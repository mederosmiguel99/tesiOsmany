const { FallecidasModel } = require('../models/fallecidas');
const { EmbarazadasModel } = require('../models/embarazada');

module.exports = {
  get: async (req, res) => {
    //  const {fallecidasId, embarazadaId} = req.body
    let fallecidas = await FallecidasModel.find().populate('idEmbarazada')
    res.status(200).json((fallecidas));
  },
  create: async (req, res) => {
    const { fecha, causa, sala, cama, idEmbarazada, idUsuario } = req.body

    const fallecidaExte = await EmbarazadasModel.findById(idEmbarazada)
    if (!fallecidaExte) {
      const fallecida = await FallecidasModel.create({
        fecha,
        causa,
        sala,
        cama,
        idEmbarazada,
        idUsuario
      })
      res.status(200).json(fallecida)
    } else {
      res.status(200).json({ error: "Embarazada existente en fallecidas" })
    }

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
      if (fallecida.idEmbarazada.Carnet_Identidad === ci) {
        fallecidas = fallecida
      }
    }

    res.status(200).json(fallecidas)
  },
  update: async (req, res) => {
    const { id, fecha, causa, sala, cama } = req.body

    let egreso = await FallecidasModel.findByIdAndUpdate(id, {
      fecha,
      causa,
      sala,
      cama
    })
    res.status(200).json(egreso)
  }
}

