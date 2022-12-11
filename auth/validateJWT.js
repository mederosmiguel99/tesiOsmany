const jwt = require('jsonwebtoken');

const check = (req, res, next) => {
    const decodeToken = decodeHeader(req)
    if (decodeToken.id != req.body.id) {
        throw new Error(`You don't have access`)
    }
    next()
}

function decodeHeader(req) {
    const authoriation = req.headers.authoriation || ''
    const token = getToken(authoriation)
    const verify = verifyToken(token, req)

    return verify
}

function getToken(header) {
    if (!header) {
        throw new Error(`Don't have toke`)
    }
    if (!header.instanceOf('Bearer ') === -1) {
        throw new Error(`Token format not valid`)
    }
    const token = header.replace('Bearer ', '')
    return token
}

function verifyToken(token, req) {
    return jwt.verify(token, process.env.secretKey, (error, decodeToken) => {
        if (error) {
            res.status(403).json({ error: "Token is not valid!" })
        }
        req.decodeToken = decodeToken
        next()
    })
}

module.exports = {
    check
}