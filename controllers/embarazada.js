const { EmbarazadasModel } = require('../models/embarazada');

module.exports = {
    get: async (req, res) => {
        const embarazadas = await EmbarazadasModel.find()
        res.status(200).json(embarazadas)
    },
    create: async (req, res) => {
        const { Carnet_Identidad, Nombre, Telefono, Provincia, Municipio, Direccion, Area_Salud, Codigo_ingreso, NoHC, NoConsulotorio } = req.body
        const embarazada = await EmbarazadasModel.create({
            Carnet_Identidad,
            Nombre,
            Telefono,
            Provincia,
            Municipio,
            Direccion,
            Area_Salud,
            Codigo_ingreso,
            NoHC,
            NoConsulotorio
        })
        res.status(200).json(embarazada)
    }
}