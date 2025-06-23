"use client";

import React, { useEffect, useRef, useState } from 'react';
import ContentCard from '../components/ContentCard';
import { FaSearch, FaEdit, FaTrash, FaPlusCircle, FaUsers, FaCheckCircle, FaTimesCircle, FaList } from 'react-icons/fa'; // Import icons
import TitleCard from '../components/TitleCard';
import { IoReloadCircle } from 'react-icons/io5';
import ModCrearColegiado from './modal/ModCrearColegiado';
import { ColegiadoFiltro } from '../api/model/interface/colegiado';
import Lista from '../api/model/interface/lista';
import Response from '../api/model/class/response';
import RestError from '../api/model/class/restError';
import { buscarcolegiadointranet } from '../api/network/ctsp';
import Loading from '../components/Loading';
import ModActualizarColegiado from './modal/ModActualizarColegiado';

import ModuloHistorialHabilitacion from './modulo/HistorialHabilitacion'
import { formatAndValidateDate } from '../tools/helper';

export default function ColegiadoPage() {

  const [inputBusqueda, setInputBusqueda] = useState<string>('');

  const [loadTable, setLoadTable] = useState<boolean>(false);
  const [dataColegiado, setDataColegiado] = useState<ColegiadoFiltro[]>([]);

  const [objColegiado, setObjColegiado] = useState<ColegiadoFiltro | null>(null);

  const refInputBusqueda = useRef<HTMLInputElement>(null)

  const abortController = useRef(new AbortController());


  useEffect(() => {
    // Carga inicial de datos
    LoadData(0, '')
  }, [])

  // Modal Crear
  const [isOpenModalCre, setIsOpenModalCre] = useState(false)

  const handleOpenModalCre = () => {
    setIsOpenModalCre(true);
  };

  const handleCloseModalCre = () => {
    setIsOpenModalCre(false);
  };

  // Modal Actualizar
  const [isOpenModalAct, setIsOpenModalAct] = useState(false)

  const handleOpenModalAct = (c: ColegiadoFiltro) => {
    setObjColegiado(c)
    setIsOpenModalAct(true);
  };

  const handleCloseModalAct = () => {
    setIsOpenModalAct(false);
  };

  //Modulo Historial Habilitacion
  const [isModuloHistorial, setIsmoduloHistorial] = useState<boolean>(false);
  const handleOpenModuloHistorial = (obj: ColegiadoFiltro) => {
    setIsmoduloHistorial(true)

    setObjColegiado(obj)
  }

  const handleCloseModuloHistorial = () => {
    setIsmoduloHistorial(false)
  }


  const handleSearch = () => {
    if (inputBusqueda == "") {
      refInputBusqueda.current?.focus()
      return
    }
    LoadData(1, inputBusqueda.trim())
  };

  const handleRecharge = () => {
    setInputBusqueda('')
    LoadData(0, "")
  }

  const LoadData = async (opcion: number, busquedaInput: string) => {

    setDataColegiado([])
    setLoadTable(true)

    const obj = {
      "tipo_busqueda": opcion,
      "busqueda": busquedaInput
    }

    const response = await buscarcolegiadointranet<Lista>(obj, abortController.current)
    if (response instanceof Response) {

      const data = response.data.rs as ColegiadoFiltro[]
      setDataColegiado(data)
    }
    if (response instanceof RestError) {
      //if (response.getType() === Types.CANCELED) return;
      console.log(response.getMessage())
    }

    setLoadTable(false)
  }

  return (
    <ContentCard>

      {
        isModuloHistorial === true ? (
          <ModuloHistorialHabilitacion colFiltro={objColegiado} hide={handleCloseModuloHistorial} />
        ) : (
          <>

            <TitleCard title="Colegiados" />

            {/* Search Input and Button */}
            <div className="mb-5 flex items-center gap-4">
              <div className="flex flex-grow">
                <input
                  type="text"
                  placeholder="Buscar colegiado..."
                  value={inputBusqueda}
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
                className="flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-stone-600 text-white rounded-lg hover:bg-stone-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-stone-500 transition duration-150 ease-in-out"
              >
                <IoReloadCircle className="w-4 h-4 mr-1.5" />
                Recargar
              </button>
              <button
                onClick={handleOpenModalCre}
                className="flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <FaPlusCircle className="w-4 h-4 mr-1.5" />
                Nuevo
              </button>
            </div>

            {/* Colegiado Table */}
            <h2 className="text-lg font-semibold text-gray-600 mb-2 flex items-center gap-2"><FaUsers className="w-5 h-5 " /> Lista de Colegiados</h2>
            <div className="overflow-x-auto shadow-sm rounded-lg mb-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Código</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">N° Documento / Nombre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Especialidad</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Habilidad</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                  {
                    loadTable ? (
                      <tr className="text-center bg-white hover:bg-gray-50">
                        <td colSpan={8} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <Loading /> <span className="text-gray-600">Cargando datos...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      dataColegiado.length == 0 ? (
                        <tr className="text-center bg-white hover:bg-gray-50">
                          <td colSpan={8} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-gray-600 uppercase">No hay datos disponibles</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        dataColegiado.map((item, index) => (
                          <tr key={item.colegiado_id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      } hover:bg-gray-100 transition duration-150 ease-in-out`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{++index}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.codigo_colegiado}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.numero_documento}  <br />{item.apellidos} {item.nombres}</td>

                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.codigo_colegiado} </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.nombre_especialidad}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.correo_personal}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                                {item.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.habilitacion === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {item.habilitacion === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                                {item.habilitacion === 1 ? 'HABILITADO' : 'INABILITADO'}
                              </span>
                              <br/>
                              <div className="text-center">{item.fecha_fin === "1900-01-01"? "-": formatAndValidateDate(item.fecha_fin)}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  className="text-yellow-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-yellow-500 shadow-sm hover:shadow-md transform hover:scale-105"
                                  title="Editar"
                                  onClick={() => handleOpenModalAct(item)}
                                >
                                  <FaEdit className="w-4 h-4" />
                                </button>
                                <button
                                  className="text-blue-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-blue-500 shadow-sm hover:shadow-md transform hover:scale-105"
                                  title="Detalle"
                                  onClick={() => handleOpenModuloHistorial(item)}
                                >
                                  <FaList className="w-4 h-4" />
                                </button>
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

            <ModCrearColegiado title={"Registrar Colegiado"} show={isOpenModalCre} loadTable={handleRecharge} hide={handleCloseModalCre} />

            <ModActualizarColegiado title={"Actualizar Colegiado"} show={isOpenModalAct} loadTable={handleRecharge} hide={handleCloseModalAct} colFiltro={objColegiado} />

          </>
        )
      }

    </ContentCard>
  );
} 