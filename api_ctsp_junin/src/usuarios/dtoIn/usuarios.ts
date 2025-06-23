export class BuscarUsuario {
  opcion: number;
  busqueda: string;
} 


export class RegistrarUsuario {
  tipo_documento_id: number;
  numero_documento: string; 
  nombres: string;          
  apellidos: string;        
  celular: string;          
  correo_personal: string;  
  direccion: string;        
  rol_id: number;           
  sexo: number;             
  fecha_nacimiento: string;   
  usuario: string;          
  clave: string;            
}

export class ActulizarUsuario {
  usuario_id: number;       
  tipo_documento_id: number;
  numero_documento: string; 
  nombres: string;          
  apellidos: string;        
  celular: string;          
  correo_personal: string;  
  direccion: string;        
  rol_id: number;           
  sexo: number;             
  fecha_nacimiento: string; 
  usuario: string;          
  clave: string;            
  estado: number;           
}

export class LoginUsuario{
  usuario: string;
  clave: string;
}