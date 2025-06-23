"use client";
import React, { useRef, useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaSearch, FaUser, FaIdCard, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { ColegiadoWeb } from '@/app/intranet/api/model/interface/colegiado';
import Lista from '@/app/intranet/api/model/interface/lista';
import { buscarcolegiadoweb } from '@/app/intranet/api/network/ctsp';
import Response from '@/app/intranet/api/model/class/response';
import RestError from '@/app/intranet/api/model/class/restError';
import toast from 'react-hot-toast';

// Función para consumir el endpoint de la API
// async function fetchColegiadosFromApi(tipo_busqueda: number, busqueda: string): Promise<Colegiado[]> {
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Usa tu variable de entorno
//   //const API_BASE_URL = process.env.API_CTSP || 'http://localhost:8000'; // Usa tu variable de entorno
//   const endpoint = `${API_BASE_URL}/colegiados/buscar-colegiado-web`;

//   try {
//     const response = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({ tipo_busqueda: tipo_busqueda, busqueda: busqueda }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error de API:', errorData);
//       throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
//     }

//     const data = await response.json();

//     // La API devuelve un objeto con una clave 'rs' que contiene el array
//     if (data && data.rs && Array.isArray(data.rs)) {
//       // Convertir el campo 'habilitacion' a 'Activo' o 'Inactivo'
//       const formattedData = data.rs.map((item: any) => ({
//         ...item,
//         estado: item.habilitacion === 1 ? 'Activo' : 'Inactivo',
//         id: item.token_colegiado, // Usar token como ID único para React
//       }));
//       return formattedData;
//     } else {
//       console.warn('API response did not contain expected array in \'rs\' key:', data);
//       return [];
//     }
//   } catch (error) {
//     console.error('Error al conectar con la API:', error);
//     return [];
//   }
// }

function ConsultaColegiado() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ColegiadoWeb[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<'codigo' | 'apellidos'>('codigo');

  const searchTermRef = useRef<HTMLInputElement>(null)

  const abortController = useRef(new AbortController());

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if(searchTerm === "") {
      // console.log("Ingrese los datos")
      toast.error("Ingrese el valor de busqueda")
      searchTermRef.current?.focus()
      return
    }

    setIsLoading(true);
    setSearchResults([]); // Limpiar resultados anteriores

    // Determinar el tipo de búsqueda numérico para la API
    const tipoBusquedaApi = searchType === 'codigo' ? 1 : 2; 

    // const results = await fetchColegiadosFromApi(tipoBusquedaApi, searchTerm);
    // setSearchResults(results);
    // setIsLoading(false);
    // setDataColegiado([])
    // setLoadTable(true)

    const obj = {
      "tipo_busqueda": tipoBusquedaApi,
      "busqueda": searchTerm
    }

    const response = await buscarcolegiadoweb<Lista>(obj, abortController.current)
    if (response instanceof Response) {

      const data = response.data.rs as ColegiadoWeb[]
      setSearchResults(data)
    }
    if (response instanceof RestError) {
      //if (response.getType() === Types.CANCELED) return;
      console.log(response.getMessage())
    }

    setIsLoading(false);

  };

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Consulta de Colegiado
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Busca información de colegiados activos en nuestro sistema
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-12 transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setSearchType('codigo')}
                  className={`flex-1 py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                    searchType === 'codigo'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaIdCard className="h-5 w-5" />
                  Buscar por Código
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('apellidos')}
                  className={`flex-1 py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                    searchType === 'apellidos'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaUser className="h-5 w-5" />
                  Buscar por Apellidos
                </button>
              </div>
              <div>
                <label htmlFor="search" className="block text-lg font-medium text-gray-700 mb-3">
                  {searchType === 'codigo' ? 'Ingrese el código de colegiado' : 'Ingrese los apellidos del colegiado'}
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      ref={searchTermRef}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder={searchType === 'codigo' ? 'Ej: C009' : 'Ej: Ramírez'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <FaSpinner className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <FaSearch className="h-4 w-4" />
                        Buscar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {searchResults.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FaUser className="h-6 w-6 text-blue-600" />
                Resultados de la búsqueda
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th> */}
                      {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Colegiatura</th> */}
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habilitacion</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-blue-600">{result.codigo_colegiado}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{result.nombres} {result.apellidos}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-600">{result.nombre_especialidad}</td> */}
                        {/* <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-600">
                          {new Date(result.fecha_nacimiento).toLocaleDateString()}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1 w-fit ${
                            result.estado === 'Activo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {result.estado === 'Activo' ? (
                              <FaCheckCircle className="h-3 w-3" />
                            ) : (
                              <FaTimesCircle className="h-3 w-3" />
                            )}
                            {result.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {searchTerm && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No se encontraron resultados para tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default ConsultaColegiado; 