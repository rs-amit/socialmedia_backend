  const mongoose = require('mongoose')

const connectionUrl = "mongodb+srv://INFocus:Philomath852@cluster0.fw8wi.mongodb.net/INFocusDB?retryWrites=true&w=majority";

const connectDB=async()=>{
  await mongoose.connect(connectionUrl , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then((response)=>console.log('server connected to the DataBase')).catch((err)=>console.log(err))
}


module.exports={ connectDB };
