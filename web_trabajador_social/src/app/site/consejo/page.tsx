"use client";
import React, { useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { BiFemale } from 'react-icons/bi';

interface ConsejoDirectivoMember {
    cargo: string;        // Cargo completo
    initials: string;    // Iniciales del cargo
    grade: string;       // Grado académico/profesional
    name: string;        // Nombre completo
}


const consejoDirectivo: ConsejoDirectivoMember[] = [
    { cargo: "DECANA", initials: "DC", grade: "Lic.", name: "Dora Emilda Alvarado Ninalaya" },
    { cargo: "TESORERA", initials: "VC1", grade: "Mg.", name: "Alicia Eliana Perez Ramos" },
    { cargo: "SECRETARIA", initials: "SC", grade: "Lic.", name: "Heldy Luz Goyas Escobar" },

    // { cargo: "TESORERA", initials: "TS", grade: "Lic.", name: "Sheila Zenobia Zavala Valdez de Santiago" },
    // { cargo: "VOCAL 2", initials: "VC2", grade: "Lic.", name: "Marybel Gil Huamancayo" }
]

const gradientPalette = [
    // 'bg-gradient-to-br from-blue-400 to-purple-600',
    // 'bg-gradient-to-br from-purple-400 to-green-600',
    // 'bg-gradient-to-br from-green-400 to-orange-600',
    // 'bg-gradient-to-br from-indigo-400 to-blue-600',
    // 'bg-gradient-to-br from-orange-400 to-red-600',
    // 'bg-gradient-to-br from-red-400 to-teal-600',
    'bg-gradient-to-br from-teal-400 to-indigo-600',

];

function Consejo() {

    return (
        <PageContainer>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                            Consejo Directivo
                        </h1>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                            Conoce a los líderes que guían nuestro compromiso con la excelencia profesional y el desarrollo social de la región.
                        </p>
                    </div>
                    
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
                            {consejoDirectivo.map((miembro, index) => (
                                <div key={index} className="group">
                                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                                        {/* Foto placeholder con efecto de gradiente */}
                                        <div className={`aspect-[3/4] ${gradientPalette[index % gradientPalette.length]} relative overflow-hidden flex items-center justify-center`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <BiFemale className="text-[600px] text-white opacity-80" />
                                            </div>
                                            {/* Efecto de overlay al hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                                                    <p className="font-medium text-3xl">{miembro.cargo}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Información */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                                                <span className="text-sm text-gray-600 font-medium">{miembro.grade}</span> {miembro.name}
                                            </h3>
                                            {/* <p className="text-sm text-gray-600 font-medium">{miembro.grade}</p> */}
                                            <p className="text-sm text-blue-600 font-medium mt-1">{miembro.cargo}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </PageContainer>
    );
}

export default Consejo;
