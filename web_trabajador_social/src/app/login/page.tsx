"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaBuilding, FaEye, FaEyeSlash, FaArrowCircleRight } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';
import { loginUsuario } from '@/app/intranet/api/network/ctsp';
import Response from '../intranet/api/model/class/response';
import RestError from '../intranet/api/model/class/restError';
import { Token } from '../intranet/api/model/interface/usuario';

function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const abortController = useRef(new AbortController());

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const body = {
      usuario: usuario,
      clave: clave,
    }

    const response = await loginUsuario<Token>(body, abortController.current)
    if (response instanceof Response) {
      const dataToken = response.data.access_token as string
      setAuth(dataToken);
      router.push('/intranet');
    }
    if (response instanceof RestError) {
      //if (response.getType() === Types.CANCELED) return;
      //console.log(response.getMessage())
      setError(response.getMessage() || 'Error al iniciar sesión');
    }

    setIsLoading(false);
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-200 to-blue-400 p-4">
      {/* Contenedor principal con efecto de cristal */}
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg mb-4">
            <FaBuilding className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Colegio de Trabajadores Sociales</h1>
          <p className="text-gray-600 mt-2">Accede a tu cuenta</p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo de email */}
            <div className="space-y-2">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <label htmlFor="clave" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="clave"
                  name="clave"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu contraseña"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Botón de login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <FaArrowCircleRight className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
            </button>

            {/* Link to main website */}
            <div className="mt-4 text-center">
              <a
                href="/"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors duration-200"
              >
                Ir al Sitio Web
              </a>
            </div>
          </form>

          {/* Footer del formulario */}
          {/* <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda? Contacta al administrador
            </p>
          </div> */}

        </div>

        {/* Footer de la página */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {/* © {new Date().getFullYear()} Colegio de Trabajadores Sociales - Huancayo */}
            © {new Date().getFullYear()} Junín - Huancayo
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 