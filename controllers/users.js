const userModel = require('../models/users');

module.exports = {
    getUsers: async (req, res) => {
        let users = await userModel.find()
        res.status(200).json((users));
    },
}

