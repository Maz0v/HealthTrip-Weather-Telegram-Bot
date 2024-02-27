require('dotenv').config()
const dbConnect = require("./utils/dbConnection")
const botController = require("./controller/botController")
const express =  require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route")

const app = express()

app.use(bodyParser.json());

dbConnect()
botController()
//botController.scheduleBot()

app.use('/', route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
     console.log(`Server is running  on port ${PORT}`)
})