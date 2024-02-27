const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI
const dbConnect = async function(){
try {
    mongoose.connect(MONGODB_URI)
    .then(() => console.log('mongodb connection successful'))
    .catch(err => console.log(err))
} catch (error) {
    console.log(error)
}
}

module.exports = dbConnect