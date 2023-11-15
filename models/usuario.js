const{Schema,model}= require("mongoose");

const UsuarioSchema=Schema({
    apellidoynombre:{
        type: String,
        required:[ true, "El apellido y nombre es obligatorio"],
    },
    dni:{
        type: String,
        required:[ true, "El Dni es obligatorio"],
        unique: true,
    },
    correo:{
        type: String,
        required:[ true, "El correo es obligatorio"],
        unique: true,  
    },
    contraseña:{
        type: String,
        required:[ true, "La contraseña es obligatoria"],
    },
    rol:{
        type: String,
        enum:[ "ADMIN_ROLE","USER_ROLE"],
        default: "USER_ROLE",   // se guarda por defecto como user role
    },
    //img:{
        //type:String, // se toma la direccion url como string
    //},
    state:{ // estado
       type: Boolean,
       default: true, // significa por defecto estará activo
    }
})

UsuarioSchema.methods.toJSON= function(){
 const{__v,password,_id,...usuario}=this.toObject(); 
 usuario.uid=_id;
 return usuario;  
};

module.exports=model("Usuario",UsuarioSchema);
