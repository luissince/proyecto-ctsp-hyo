import { Controller, Get, HttpException, HttpStatus, Post, UseGuards, Body, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ColegiadosService } from './colegiados.service';
import { ActualizarColegiado, BuscarFilto, RegistrarColegiado } from './dtoIn/colegiados';
import { CustomRequest } from '../usuarios/interface/CustomRequest';

@ApiTags('Colegiados')
@Controller('colegiados')
export class ColegiadosController {
    constructor(private readonly cService: ColegiadosService) { }

    @Post('buscar-colegiado-web')
    @ApiOperation({
        summary: 'Buscar colegiado en la web',
        description: 'Permite buscar un colegiado utilizando un tipo de búsqueda y un término de búsqueda'
    })
    @ApiBody({
        type: BuscarFilto,
        description: 'Datos necesarios para realizar la búsqueda del colegiado',
        examples: {
            example1: {
                value: {
                    tipo_busqueda: 1,
                    busqueda: "12345678"
                },
                summary: 'Ejemplo de búsqueda por codigo'
            },
            example2: {
                value: {
                    tipo_busqueda: 2,
                    busqueda: "Pérez"
                },
                summary: 'Ejemplo de búsqueda por apellidos'
            }
        }
    })

    /*
    @ApiResponse({ 
        status: 200, 
        description: 'Búsqueda realizada con éxito',
        schema: {
            type: 'object',
            properties: {
                rs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        additionalProperties: true
                    }
                }
            }
        }
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Error interno del servidor',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'number', example: 500 },
                message: { type: 'string', example: 'An unexpected error occurred' }
            }
        }
    })
    */
    async buscarColegiadoWeb(@Body() filter: BuscarFilto) {
        try {
            const { tipo_busqueda, busqueda } = filter;
            const result = await this.cService.buscarColegiadoWeb(tipo_busqueda, busqueda);
            return {
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('buscar-colegiado-intranet')
    @ApiOperation({
        summary: 'Buscar colegiado en la intranet',
        description: 'Permite buscar un colegiado en la intranet utilizando un tipo de búsqueda y un término de búsqueda'
    })
    @ApiBody({
        type: BuscarFilto,
        description: 'Datos necesarios para realizar la búsqueda del colegiado en la intranet',
        examples: {
            example1: {
                value: {
                    tipo_busqueda: 0,
                    busqueda: ""
                },
                summary: 'Ejemplo de búsqueda general'
            },
            example2: {
                value: {
                    tipo_busqueda: 1,
                    busqueda: "88888888"
                },
                summary: 'Ejemplo de búsqueda por coincidencia de número de documento o apellidos'
            }
        }
    })
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    async buscarColegiadoIntranet(@Body() filter: BuscarFilto) {
        try {
            const { tipo_busqueda, busqueda } = filter;
            const result = await this.cService.buscarColegiadoIntranet(tipo_busqueda, busqueda);
            return {
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('registrar-colegiado')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Registrar nuevo colegiado',
        description: 'Permite registrar un nuevo colegiado en el sistema. El ID del usuario que registra se obtiene del token JWT.'
    })
    @ApiBody({
        type: RegistrarColegiado,
        description: 'Datos del colegiado a registrar (usuario_registra se obtiene del token)',
        examples: {
            example1: {
                value: {
                    codigo_colegiado: "12345",
                    tipo_documento_id: 1,
                    numero_documento: "12345678",
                    nombres: "Juan",
                    apellidos: "Pérez García",
                    celular: "987654321",
                    correo_personal: "juan.perez@example.com",
                    direccion: "Av. Principal 123",
                    sexo: 1,
                    fecha_nacimiento: "1990-01-01",
                    especialidad_id: 1,
                },
                summary: 'Ejemplo de registro de colegiado'
            }
        }
    })
    async registrarColegiado(@Body() c: RegistrarColegiado, @Req() req: CustomRequest) {
        try {
            const usuario_registra = req.user.usuario_id;
            const result = await this.cService.registrarColegiado(c, usuario_registra);
            return {
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('actualizar-colegiado')
    @ApiOperation({
        summary: 'Actualizar colegiado',
        description: 'Permite actualizar los datos de un colegiado existente en el sistema'
    })
    @ApiBody({
        type: ActualizarColegiado,
        description: 'Datos del colegiado a actualizar',
        examples: {
            example1: {
                value: {
                    colegiado_id: 1,
                    codigo_colegiado: "12345",
                    tipo_documento_id: 1,
                    numero_documento: "12345678",
                    nombres: "Juan",
                    apellidos: "Pérez García",
                    celular: "987654321",
                    correo_personal: "juan.perez@example.com",
                    direccion: "Av. Principal 123",
                    sexo: 1,
                    fecha_nacimiento: "1990-01-01",
                    especialidad_id: 1,
                    estado: 1,
                    usuario_modifica: 1
                },
                summary: 'Ejemplo de actualización de colegiado'
            }
        }
    })
    async actualizarColegiado(@Body() c: ActualizarColegiado) {
        try {
            const result = await this.cService.actualizarColegiado(c);
            return {
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}