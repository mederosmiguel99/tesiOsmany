const PrismaClient = require('../database/config').getPrismaInstance();
const PrismaHelper = require('../helpers/PrismaHelper');
const jwt = require('jsonwebtoken');
const ApiError = require('../helpers/ApiError');
module.exports = {

    validateJWT: async (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json(new ApiError({ clientErrorMessage: 'No hay token en la petición', debugErrorMessage: "noTokenError" }));
        }
        try {
            console.log(token);
            const { uid } = jwt.verify(token, process.env.SECRET);
            const user = await PrismaClient.users.findFirst({
                where: {
                    id: uid
                }
            })
            if (!user) {
                return res.status(401).json({
                    msg: 'Usuario no permitido'
                })
            }
            if (user.isDeleted) {
                return res.status(401).json({
                    msg: 'Usuario no permitido'
                })
            }
            // if (user.isVerified) {
            //     return res.status(401).json({
            //         msg: 'Usuario no verificado'
            //     })
            // }
            req.uid = uid;
            req.user = user
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Usted no tiene acceso para acceder aquí!! ' + error,
            })
        }
        //console.log(token)
    }
}