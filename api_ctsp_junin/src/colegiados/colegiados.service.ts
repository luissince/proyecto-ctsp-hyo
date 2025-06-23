import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { SqlDataType } from 'src/database/interface/SqlDataType';
import { ActualizarColegiado, RegistrarColegiado } from './dtoIn/colegiados';
//import { ActulizarUsuario, LoginUsuario, RegistrarUsuario } from './dtoIn/usuarios';

@Injectable()
export class ColegiadosService {
    constructor(
        private readonly dbs: DatabaseService,
    ) { }


    async buscarColegiadoWeb(tipo_busqueda: number, busqueda: string): Promise<any> {

        const result = await this.dbs.execSP('sp_buscar_colegiado_web', [
            { value: tipo_busqueda, type: SqlDataType.INT },
            { value: busqueda, type: SqlDataType.VARCHAR },
        ]);

        // Filtra los elementos que son arrays (conjuntos de resultados de datos)
        // y excluye objetos como ResultSetHeader.
        const dataResults = result.filter(item => Array.isArray(item));

        // Si solo hay un conjunto de resultados de datos, devolverlo directamente.
        // De lo contrario, devolver todos los conjuntos de resultados de datos.
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }

    async buscarColegiadoIntranet(tipo_busqueda: number, busqueda: string): Promise<any> {

        const result = await this.dbs.execSP('sp_buscar_colegiado_intranet', [
            { value: tipo_busqueda, type: SqlDataType.INT },
            { value: busqueda, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }


    async registrarColegiado(c: RegistrarColegiado, usuario_registra: number): Promise<any> {
        const result = await this.dbs.execSP('sp_registrar_colegiado', [
            { value: c.codigo_colegiado, type: SqlDataType.VARCHAR },
            { value: c.tipo_documento_id, type: SqlDataType.INT },
            { value: c.numero_documento, type: SqlDataType.VARCHAR },
            { value: c.nombres, type: SqlDataType.VARCHAR },
            { value: c.apellidos, type: SqlDataType.VARCHAR },
            { value: c.celular, type: SqlDataType.VARCHAR },
            { value: c.correo_personal, type: SqlDataType.VARCHAR },
            { value: c.direccion, type: SqlDataType.VARCHAR },
            { value: c.sexo, type: SqlDataType.TINYINT },
            { value: c.fecha_nacimiento, type: SqlDataType.VARCHAR },
            { value: c.especialidad_id, type: SqlDataType.INT },
            { value: c.numero_documento, type: SqlDataType.VARCHAR }, // Es para la clave por defecto
            { value: usuario_registra, type: SqlDataType.INT },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;

    }

    async actualizarColegiado(c: ActualizarColegiado): Promise<any> {
        const result = await this.dbs.execSP('sp_actualizar_colegiado', [
            { value: c.colegiado_id, type: SqlDataType.INT },
            { value: c.codigo_colegiado, type: SqlDataType.VARCHAR },
            { value: c.tipo_documento_id, type: SqlDataType.INT },
            { value: c.numero_documento, type: SqlDataType.VARCHAR },
            { value: c.nombres, type: SqlDataType.VARCHAR },
            { value: c.apellidos, type: SqlDataType.VARCHAR },
            { value: c.celular, type: SqlDataType.VARCHAR },
            { value: c.correo_personal, type: SqlDataType.VARCHAR },
            { value: c.direccion, type: SqlDataType.VARCHAR },
            { value: c.sexo, type: SqlDataType.TINYINT },
            { value: c.fecha_nacimiento, type: SqlDataType.VARCHAR },
            { value: c.especialidad_id, type: SqlDataType.INT },
            { value: c.estado, type: SqlDataType.BOOLEAN },
            { value: c.usuario_modifica, type: SqlDataType.INT }
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }


}