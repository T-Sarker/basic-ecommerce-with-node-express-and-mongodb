const mongoose = require('mongoose')

//**Creating the mongoose connection */ 

const dbCon = async ()=>{
    try {
        const uri = "mongodb://localhost:27017/ecom";

        await mongoose.connect(uri, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        },()=>{
            console.log("db connected");
        });

    } catch (e) {
        console.log('database connection failed'+e);        
    }
}
 
module.exports = dbCon