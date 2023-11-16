const{Schema,model}= require("mongoose");

const HabitacionSchema=Schema({
    piso:{
        type:Number,
        required:[ true, "El piso de la habitación es obligatorio"],
    },
    numero:{
        type: Number,
        required:[ true, "El número de la habitación es obligatorio"],
        unique: true,  
    },
    
    tipohab:{
        type: String,
        enum:[ "SINGLE","DOBLE","TRIPLE"],
        default: "SINGLE",  
    },
    fotohab:{
        type:String, 
    },
    precio:{
        type:Number,
        required:[ true, "El precio por noche es obligatorio"],
    },
    
})

HabitacionSchema.methods.toJSON= function(){
 const{__v,numero,_id,...habitación}=this.toObject(); 
 usuario.hid=_id;
 return habitación;  
};

module.exports=model("Habitación",HabitacionSchema);
