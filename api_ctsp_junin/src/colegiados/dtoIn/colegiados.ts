export class BuscarFilto {
    tipo_busqueda: number;
    busqueda: string;
}


export class RegistrarColegiado {
    codigo_colegiado: string;
    tipo_documento_id: number;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo_personal: string;
    direccion: string;
    sexo: number;
    fecha_nacimiento: string;
    especialidad_id: number;
    //clave: string;                 
    usuario_registra: number;
}


export class ActualizarColegiado {
    colegiado_id: number;
    codigo_colegiado: string;
    tipo_documento_id: number;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo_personal: string;
    direccion: string;
    sexo: number;
    fecha_nacimiento: string;
    especialidad_id: number;
    estado: number;
    usuario_modifica: number;
}