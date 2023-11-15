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
    contrasenia:{
        type: String,
        required:[ true, "La contraseña es obligatoria"],
    },
    rol:{
        type: String,
        enum:[ "ADMIN_ROLE","USER_ROLE"],
        default: "USER_ROLE",   
    },
    estado:{
       type: Boolean,
       default: true, 
    }
})

UsuarioSchema.methods.toJSON= function(){
 const{__v,password,_id,...usuario}=this.toObject(); 
 usuario.uid=_id;
 return usuario;  
};

module.exports=model("Usuario",UsuarioSchema);
