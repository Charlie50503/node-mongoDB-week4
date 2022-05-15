const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')

dotenv.config({
  path:'config.env'
})

const {DATABASE,DATABASE_PASSWORD} = process.env
const url = DATABASE?.replace("<password>",DATABASE_PASSWORD)

mongoose.connect(url).then(()=>{
  console.log("database connected.");
})