import { FaCircleArrowLeft, FaCirclePlus } from "react-icons/fa6";
import { ColegiadoFiltro } from "../../api/model/interface/colegiado";
import TitleCard from "../../components/TitleCard";
import TitleDetalleCard from "../../components/TitleDetalleCard";
import CardDatosColegiado from "../../components/CardDataColegiado";
import { HiClipboardList } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { BusquedaHistorialHabilitacion } from "../../api/model/interface/habilitacion";
import { FaCheckCircle, FaEdit, FaLock, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import Lista from "../../api/model/interface/lista";
import Response from "../../api/model/class/response";
import RestError from "../../api/model/class/restError";
import { buscarHabilitacionesColegiado } from "../../api/network/ctsp";
import Loading from "../../components/Loading";
import { RiExchangeFill } from "react-icons/ri";
import ModCrearHistorial from "../modal/ModCrearHistorial";
import { formatAndValidateDate, formatRegistrationDate, formatRegistrationTime } from "../../tools/helper";

type Props = {
    hide: () => void;
    colFiltro: ColegiadoFiltro | null;
}

export default function HistorialHabilitacion(props: Props) {

    const [dataHisHab, setDataHisHab] = useState<BusquedaHistorialHabilitacion[]>([])
    const [loadTable, setLoadTable] = useState<boolean>(false)

    const abortController = useRef(new AbortController());


    // Modal Crear
    const [isOpenModalCre, setIsOpenModalCre] = useState(false)

    const handleOpenModalCre = () => {
        setIsOpenModalCre(true);
    };

    const handleCloseModalCre = () => {
        setIsOpenModalCre(false);
    };

    useEffect(() => {
        if (props.colFiltro && props.colFiltro.colegiado_id != null) {
            LoadData(props.colFiltro.colegiado_id);
        }
    }, [props.colFiltro]);

    const LoadData = async (id: number) => {

        setDataHisHab([])
        setLoadTable(true)

        const response = await buscarHabilitacionesColegiado<Lista>(id, abortController.current)
        if (response instanceof Response) {

            const data = response.data.rs as BusquedaHistorialHabilitacion[]
            setDataHisHab(data)

        }
        if (response instanceof RestError) {
            //if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

        setLoadTable(false)
    }

    const reloadTable = () => {
        if (props.colFiltro?.colegiado_id != null) {
            LoadData(props.colFiltro.colegiado_id);
        }
    };

    return (
        <>
            <TitleDetalleCard title={"Historial de Habilitaciones"} hide={props.hide} />

            <CardDatosColegiado info={props.colFiltro}>
                <div className="flex">
                    <button
                        className="mt-1 mr-2 flex items-center rounded border-md p-2 text-xs font-semibold border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                        onClick={() => handleOpenModalCre()}
                    >
                        <FaPlusCircle className="w-4 h-4 mr-1.5" /> NUEVO
                    </button>
                </div>

            </CardDatosColegiado>

            {/* Cuerpo */}

            <h2 className="text-lg font-semibold text-gray-600 mb-2 flex items-center gap-2 mt-5"><HiClipboardList className="w-5 h-5 " /> Lista de Historial</h2>
            <div className="overflow-x-auto shadow-sm rounded-lg mb-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha Inicio</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha Fin</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Observacion</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha Registro</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Usuario Registro</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
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
                                dataHisHab.length == 0 ? (
                                    <tr className="text-center bg-white hover:bg-gray-50">
                                        <td colSpan={8} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-gray-600 uppercase">No hay datos disponibles</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    dataHisHab.map((item, index) => (
                                        <tr key={item.historial_habilitacion_id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}} hover:bg-gray-100 transition duration-150 ease-in-out`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{++index}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <div className="text-center">{item.fecha_inicio === "1900-01-01"? "-": formatAndValidateDate(item.fecha_inicio)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <div className="text-center">{item.fecha_fin === "1900-01-01"? "-": formatAndValidateDate(item.fecha_fin)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.observacion_registro}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {formatRegistrationDate(item.fecha_registra)} - {formatRegistrationTime(item.fecha_registra)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.nombre_completo_usuario} { }</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                                                    {item.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* <button
                                                        disabled={item.estado !== 1}
                                                        className={`text-yellow-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-yellow-500 shadow-sm hover:shadow-md transform hover:scale-105 ${item.estado !== 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                        title="Editar"
                                                    >
                                                        {item.estado !== 1 ? <FaLock className="w-4 h-4 text-gray-400" /> : <FaEdit className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        disabled={item.estado !== 1}
                                                        className={`text-sky-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-sky-500 shadow-sm hover:shadow-md transform hover:scale-105 ${item.estado !== 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                        title="Detalle"
                                                    >
                                                        {item.estado !== 1 ? <FaLock className="w-4 h-4 text-gray-400" /> : <RiExchangeFill className="w-4 h-4" />}
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


            <ModCrearHistorial title="Registrar Habilitacion" show={isOpenModalCre} hide={handleCloseModalCre} loadTable={reloadTable} idColegiado={props.colFiltro?.colegiado_id ?? 0}/>
        </>
    )
}