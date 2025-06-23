"use client";
import React, { useState, useEffect } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import Carousel from "@/app/site/components/Carousel";
import { FaArrowRight, FaUsers, FaBuilding, FaBook, FaHandshake, FaLaptop, FaUserTie, FaUniversity, FaClipboardList, FaGavel, FaGlobe, FaHeartbeat, FaLightbulb, FaChalkboardTeacher, FaBalanceScale, FaPencilRuler, FaRegLightbulb, FaImage } from 'react-icons/fa';
import { BsCameraReelsFill, BsCloudFill, BsDatabaseFill } from 'react-icons/bs';
import { BiFemale } from 'react-icons/bi';
import Image from 'next/image';


interface ConsejoDirectivoMember {
  cargo: string;        // Cargo completo
  initials: string;    // Iniciales del cargo
  grade: string;       // Grado académico/profesional
  name: string;        // Nombre completo
}


const consejoDirectivo: ConsejoDirectivoMember[] = [
  { cargo: "DECANA", initials: "DC", grade: "Lic.", name: "Dora Emilda Alvarado Ninalaya" },
  { cargo: "TESORERA", initials: "TS", grade: "Lic.", name: "Sheila Zenobia Zavala Valdez de Santiago" },
  { cargo: "SECRETARIA", initials: "SC", grade: "Lic.", name: "Heldy Luz Goyas Escobar" },
  { cargo: "VOCAL 1", initials: "VC1", grade: "Mg.", name: "Alicia Eliana Perez Ramos" },
  { cargo: "VOCAL 2", initials: "VC2", grade: "Lic.", name: "Marybel Gil Huamancayo" }
]

// Definir un pool de iconos temáticos
const iconPool = [
  FaUsers,
  FaBuilding,
  FaBook,
  FaHandshake,
  FaLaptop,
  FaUserTie,
  FaUniversity,
  FaClipboardList,
  FaGavel,
  FaGlobe,
  FaHeartbeat,
  FaLightbulb,
  FaChalkboardTeacher,
  FaBalanceScale,
  FaPencilRuler,
  FaRegLightbulb,
  BsCameraReelsFill,
  BsCloudFill,
  BsDatabaseFill
];

// Definir una paleta de colores para los iconos (clases de Tailwind)
const colorPalette = [
  'text-blue-600',
  'text-purple-600',
  'text-green-600',
  'text-orange-600',
  'text-red-600',
  'text-teal-600',
  'text-indigo-600',
];

const gradientPalette = [
  // 'bg-gradient-to-br from-blue-400 to-purple-600',
  // 'bg-gradient-to-br from-purple-400 to-green-600',
  // 'bg-gradient-to-br from-green-400 to-orange-600',
  // 'bg-gradient-to-br from-indigo-400 to-blue-600',
  // 'bg-gradient-to-br from-orange-400 to-red-600',
  // 'bg-gradient-to-br from-red-400 to-teal-600',
  'bg-gradient-to-br from-teal-400 to-indigo-600',
  
];

// Función para obtener un número aleatorio de iconos únicos con colores aleatorios
const getRandomIconsWithColors = (count: number) => {
  const shuffledIcons = iconPool.sort(() => 0.5 - Math.random()).slice(0, count);
  const shuffledColors = colorPalette.sort(() => 0.5 - Math.random());

  return shuffledIcons.map((Icon, index) => ({
    Icon,
    color: shuffledColors[index % shuffledColors.length] // Asigna un color de la paleta (se repite si hay más iconos que colores)
  }));
};

function SitePage() {
  // Array de elementos (imágenes) para el carrusel
  const carouselItems: React.ReactNode[] = [
    <div key="item1" className="flex items-center justify-center bg-gray-200 h-[550px]"><Image src="/images/site/slide/slide_1.webp" alt="Slide 1" width={1200} height={550} className="w-full h-full object-cover" /></div>,
    <div key="item2" className="flex items-center justify-center bg-gray-300 h-[550px]"><Image src="/images/site/slide/slide_2.webp" alt="Slide 2" width={1200} height={550} className="w-full h-full object-cover" /></div>,
    <div key="item3" className="flex items-center justify-center bg-gray-400 h-[550px]"><Image src="/images/site/slide/slide_3.webp" alt="Slide 3" width={1200} height={550} className="w-full h-full object-cover" /></div>,
  ];

  // Estado para los iconos (con colores) que cambian aleatoriamente
  const [currentIconsWithColors, setCurrentIconsWithColors] = useState<{ Icon: React.ElementType; color: string }[]>([]);

  // Configurar el intervalo para cambiar iconos y colores
  useEffect(() => {
    // Seleccionar iconos y colores iniciales al montar
    setCurrentIconsWithColors(getRandomIconsWithColors(12)); // Mostrar 12 iconos ahora (4x3 grid)

    const intervalId = setInterval(() => {
      setCurrentIconsWithColors(getRandomIconsWithColors(12)); // Cambiar 12 iconos y colors cada 5 seconds
    }, 5000); // Cambiar cada 5000 ms (5 segundos)

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El array vacío asegura que el efecto solo se ejecute al montar y desmontar

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                Colegio de Trabajadores Sociales del Perú
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Región Huancayo - Sirviendo a la comunidad con profesionalismo y dedicación social
              </p>
            </div>

            {/* Carrusel */}
            <div className="rounded-2xl overflow-hidden shadow-xl mb-16 w-full">
              <Carousel items={carouselItems} interval={5000} />
            </div>
          </div>
        </section>

        {/* Bienvenida Section - Inspirado en el ejemplo */}
        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Contenido de Texto */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Bienvenido a Nuestra Institución
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Aquí podrás encontrar información relevante sobre nuestra institución, actividades, noticias, cursos de formación y recursos para nuestros colegiados y el público en general. Estamos comprometidos con el desarrollo profesional de nuestros miembros y el bienestar de la comunidad en Huancayo.
                </p>
                <a
                  href="/site/institucional"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Conoce más
                  <FaArrowRight className="h-4 w-4" />
                </a>
              </div>
              {/* Elemento Visual con iconos aleatorios y colores */}
              <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>

                {/* Grid de iconos aleatorios con colores */}
                <div className="relative z-10 w-full h-full grid grid-cols-4 grid-rows-3 gap-6 items-center justify-items-center opacity-90 p-4">
                  {currentIconsWithColors.map(({ Icon, color }, index) => (
                    <div key={index} className="flex items-center justify-center p-3 rounded-xl bg-white bg-opacity-40 shadow-md transform transition-transform duration-300 hover:scale-105 hover:bg-opacity-60 w-16 h-16">
                      <Icon className={`h-9 w-9 ${color} opacity-90`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consejo Directivo Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Consejo Directivo</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Nuestro equipo de profesionales comprometidos con el desarrollo social y profesional
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
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
        </section>


        {/* Galería Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Galería de Imágenes
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explora nuestra colección de momentos importantes y eventos destacados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaImage className="h-16 w-16 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Imagen {index + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Facebook Embed */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Últimas Noticias y Eventos en Facebook
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Sigue nuestra página oficial de Facebook para mantenerte informado sobre las últimas noticias, eventos, comunicados y actividades del Colegio de Trabajadores Sociales del Perú - Región Huancayo.
            </p>
            <div className="relative w-full max-w-lg mx-auto" style={{ height: '500px' }}>
              {/* Facebook Page Embed */}
              <div className="rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-blue-900/50">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61572236218259&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="500"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* <div className="fb-page" data-href="https://www.facebook.com/profile.php?id=61572236218259" data-tabs="timeline" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/profile.php?id=61572236218259" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/profile.php?id=61572236218259">Colegio De Trabajadores Sociales Del Perú - Region VI</a></blockquote></div>

                <div id="fb-root"></div>
                <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v23.0&appId=765295755269488"></script> */}

              </div>
            </div>
            {/* <p className="mt-4 text-gray-600">Puedes reemplazar el `src` del iframe con la URL de tu página o publicación de Facebook.</p> */}
          </div>
        </section>

      </div>
    </PageContainer>
  );
}

export default SitePage;
