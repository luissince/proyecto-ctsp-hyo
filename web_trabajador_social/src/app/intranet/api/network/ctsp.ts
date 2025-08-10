import axios from 'axios';
import Response from '../model/class/response';
import Resolve from '../model/class/resolve';
import RestError from '../model/class/restError';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_UR,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use((config) => {
    const storage = window.localStorage as Storage;
    const tokenString = storage.getItem('token-storage'); // **Cambio aquí: de 'token' a 'token-storage'**
    let token: string | null = null;

    if (tokenString) {
        try {
            // El valor guardado por Zustand es un JSON: {"state":{"token":"<jwt>", ...}, "version":0}
            const parsedState = JSON.parse(tokenString);
            token = parsedState.state.token; 
        } catch (e) {
            console.error("Error parsing token from localStorage", e);
        }
    }

    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    // Log de las cabeceras de la petición
    // console.log('Request Headers:', config.headers);
    return config;
});

// Agregar interceptor de respuesta para debugging
// instance.interceptors.response.use(
//     (response) => {
//         // Log de las cabeceras de respuesta
//         console.log('Response Headers:', response.headers);
//         return response;
//     },
//     (error) => {
//         console.error('Response Error:', error);
//         return Promise.reject(error);
//     }
// );

// AUTENTICACIÓN
export async function loginUsuario<Token>(params: object, abortController: AbortController | null = null): Promise<Response<Token> | RestError> {
    return await Resolve.create(instance.post<Token>(`usuarios/login-usuario`, params, { signal: abortController?.signal }));
}

export async function verificarEstadoToken<EstadoToken>(abortController: AbortController | null = null): Promise<Response<EstadoToken> | RestError> {
    return await Resolve.create(instance.get<EstadoToken>(`usuarios/verificar-token`, { signal: abortController?.signal }));
}

// USUARIO
export async function busquedaDocumentoOApellidos<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`usuarios/busqueda-documento-o-apellidos`, params, { signal: abortController?.signal }));
}

export async function registrarUsuario<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`usuarios/registrar-usuario`, params, { signal: abortController?.signal }));
}

export async function actualizarUsuario<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`usuarios/actualizar-usuario`, params, { signal: abortController?.signal }));
}

// COLEGIADO
export async function buscarcolegiadointranet<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`colegiados/buscar-colegiado-intranet`, params, { signal: abortController?.signal }));
}

export async function buscarcolegiadoweb<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`colegiados/buscar-colegiado-web`, params, { signal: abortController?.signal }));
}

export async function registrarColegiado<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`colegiados/registrar-colegiado`, params, { signal: abortController?.signal }));
}

export async function actualizarColegiado<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`colegiados/actualizar-colegiado`, params, { signal: abortController?.signal }));
}

// HISTORIAL
export async function buscarHabilitacionesColegiado<Lista>(colegiado_id: number, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.get<Lista>(`habilitaciones/buscar-habilitacion-por-colegiado-id/${colegiado_id}`, { signal: abortController?.signal }));
}

export async function registrarHabilitacion<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`habilitaciones/registrar-habilitacion`, params, { signal: abortController?.signal }));
}

export async function actualizarHabilitacion<Lista>(params: object, abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.post<Lista>(`habilitaciones/actualizar-habilitacion`, params, { signal: abortController?.signal }));
}

// TABLAS GENERICAS
export async function tiposDocumentoLista<Lista>(abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.get<Lista>(`tablas/tipos-documento`, { signal: abortController?.signal }));
}

export async function especialidadesLista<Lista>(abortController: AbortController | null = null): Promise<Response<Lista> | RestError> {
    return await Resolve.create(instance.get<Lista>(`tablas/especialidades`, { signal: abortController?.signal }));
}
