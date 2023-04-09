//requring mongoose
const mongoose=require('mongoose');

//making connect with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/Codial_db')

//acquiring connection
const db=mongoose.connection;

// handel errors
db.on("error",console.error.bind(console,"Error found while connect with mongodb"))

// handel runnning status
db.once("open",function(){
    console.log("Sucessfully connected with MongoDb database")
})