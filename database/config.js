const mongoose = require('mongoose');
require('colors');

async function dbConnection() {
    console.log('Connecting to database'.blue)
    try {
        await mongoose.connect('mongodb://localhost:27017/tesisOsmany');
        console.log('Database is Online'.green)
    } catch (error) {
        console.clear();
        console.log(error)
        throw new Error('Database is Offline'.red);
    }
}

module.exports = { dbConnection }
