const { EmbarazadasModel } = require('../models/embarazada');

module.exports = {
    get: async (req, res) => {
        const embarazadas = await EmbarazadasModel.find()
        res.status(200).json(embarazadas)
    },
    getByCI: async (req,res)=>{
        const {Carnet_Identidad} = req.query
        const embarazadas = await EmbarazadasModel.findOne({Carnet_Identidad})
        res.status(200).json(embarazadas)
    },
    create: async (req, res) => {
        const { Carnet_Identidad, Nombre, Telefono, Provincia, Municipio, Direccion, Area_Salud, Codigo_ingreso, NoHC, NoConsulotorio } = req.body
        let embarazada = await EmbarazadasModel.findOne({Carnet_Identidad})
        if(!embarazada){
            embarazada = await EmbarazadasModel.create({
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
        }else{
            res.status(200).json({error:"Embarazada existente"})
        }
        
    },
    update: async (req, res) => {
        const { id, Carnet_Identidad, Nombre, Telefono, Provincia, Municipio, Direccion, Area_Salud, Codigo_ingreso, NoHC, NoConsulotorio} = req.body
        
        let egreso = await EmbarazadasModel.findByIdAndUpdate(id, {
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
        res.status(200).json(egreso)
    }
}