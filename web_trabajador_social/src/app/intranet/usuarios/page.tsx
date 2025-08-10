"use client";

import React, { useEffect, useRef, useState } from 'react';
import ContentCard from '../components/ContentCard';
import { FaSearch, FaEdit, FaPlusCircle, FaUserCog, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import icons
import TitleCard from '../components/TitleCard';
import ModCrearUsuario from './modal/ModCrearUsuario';
import { IoReloadCircle } from 'react-icons/io5';
import Lista from '../api/model/interface/lista';
import { busquedaDocumentoOApellidos } from '../api/network/ctsp';
import Response from '../api/model/class/response';
import RestError from '../api/model/class/restError';
import { UsuarioFiltro } from '../api/model/interface/usuario';
import Loading from '../components/Loading';
import ModActualizarUsuario from './modal/ModActualizarUsuario';

export default function UsuariosPage() {

  const [inputBusqueda, setInputBusqueda] = useState<string>('');

  const [loadTable, setLoadTable] = useState<boolean>(false);
  const [dataUsuario, setDataUsuario] = useState<UsuarioFiltro[]>([]);

  const [objUsuario, setObjUsuario] = useState<UsuarioFiltro | null>(null);

  const refInputBusqueda = useRef<HTMLInputElement>(null)

  const abortController = useRef(new AbortController());

  useEffect(() => {
    // Carga inicial de datos
    LoadData(0, '')
  }, [])


  // Modal Crear
  const [isOpenModalCrear, setIsOpenModalCrear] = useState(false)

  const handleOpenModalCre = () => {
    setIsOpenModalCrear(true);
  };

  const handleCloseModalCre = () => {
    setIsOpenModalCrear(false);
  };

  // Modal Actualizar
  const [isOpenModalAct, setIsOpenModalAct] = useState(false)

  const handleOpenModalAct = (u: UsuarioFiltro) => {

    setObjUsuario(u)

    setIsOpenModalAct(true);
  };

  const handleCloseModalAct = () => {
    setIsOpenModalAct(false);
  };

  const handleSearch = () => {
    if(inputBusqueda == ""){
      refInputBusqueda.current?.focus()
      return
    }
    LoadData(1, inputBusqueda.trim())
  };

  const handleRecharge = () => {
    setInputBusqueda('')
    LoadData(0,"")
  }

  const LoadData = async (opcion: number, busquedaInput: string) => {

    setDataUsuario([])
    setLoadTable(true)

    const obj = {
      "opcion": opcion,
      "busqueda": busquedaInput
    }

    const response = await busquedaDocumentoOApellidos<Lista>(obj, abortController.current)
    if (response instanceof Response) {

      const data = response.data.rs as UsuarioFiltro[]
      setDataUsuario(data)
    }
    if (response instanceof RestError) {
      //if (response.getType() === Types.CANCELED) return;
      console.log(response.getMessage())
    }

    setLoadTable(false)
  }

  return (
    <ContentCard>
      <TitleCard title="Usuarios" />

      {/* Search Input and Button */}
      <div className="mb-5 flex flex-col md:flex-row items-stretch md:items-center gap-y-2 md:gap-y-0 md:gap-x-4">
        <div className="flex flex-row md:flex-grow">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={inputBusqueda}
            ref={refInputBusqueda}
            onChange={(e) => setInputBusqueda(e.target.value)}
            className="flex-grow px-3 py-1.5 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-gray-600 text-white rounded-r-lg hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          >
            <FaSearch className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleRecharge}
          className="w-full md:w-auto flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-stone-600 text-white rounded-lg hover:bg-stone-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-stone-500 transition duration-150 ease-in-out"
        >
          <IoReloadCircle className="w-4 h-4 mr-1.5" />
          Recargar
        </button>
        <button
          onClick={handleOpenModalCre}
          className="w-full md:w-auto flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          <FaPlusCircle className="w-4 h-4 mr-1.5" />
          Nuevo
        </button>
      </div>

      {/* User Table */}
      <h2 className="text-lg font-semibold text-gray-600 mb-2 flex items-center gap-2"><FaUserCog className="w-5 h-5 " /> Lista de Usuarios</h2>
      <div className="overflow-x-auto shadow-sm rounded-lg mb-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Celular / Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Rol</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            {
              loadTable ? (
                <tr className="text-center bg-white hover:bg-gray-50">
                  <td colSpan={6} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Loading /> <span className="text-gray-600">Cargando datos...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                dataUsuario.length == 0 ? (
                  <tr className="text-center bg-white hover:bg-gray-50">
                    <td colSpan={6} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-600 uppercase">No hay datos disponibles</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  dataUsuario.map((item, index) => (
                    <tr key={item.usuario_id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      } hover:bg-blue-50 transition duration-150 ease-in-out`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{++index}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.apellidos} {item.nombres}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.celular} <br/> {item.correo_personal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.nombre_rol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                          {item.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="text-yellow-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-yellow-500 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Editar"
                            onClick={ () => handleOpenModalAct(item) }
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          {/* <button
                            className="text-red-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-red-500 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Eliminar"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                )
              )
            }

          </tbody>
        </table>
      </div>

      {/* Modal Crear Usuario */}
      <ModCrearUsuario title={"Registrar Usuario"} show={isOpenModalCrear} loadTable={handleRecharge} hide={handleCloseModalCre} />

      {/* Modal Actualizar Usuario */}
      <ModActualizarUsuario title={"Actualizar Usuario"} show={isOpenModalAct} useFiltro={objUsuario} loadTable={handleRecharge} hide={handleCloseModalAct} />

    </ContentCard>
  );
} 