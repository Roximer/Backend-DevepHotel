const mongoose = require('mongoose');

//conexion a la base de datos
const dbConnection=async()=>{
try{
await mongoose.connect (process.env.MONGODB_CNN);
console.log ("Base de datos online");
}catch (error){
console.log("error");
throw new Error("Error de conexion con la base de datos");
}
}

module.exports={
    dbConnection,
};
