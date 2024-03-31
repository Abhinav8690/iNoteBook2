const mongoose = require('mongoose');
const mongoUri="mongodb://localhost:27017/inotebookdb"

const connectToMongo=()=>{
    mongoose.connect(mongoUri,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("connected to mongo successfully")
        }
    })
}
module.exports=connectToMongo