"use client";
import React, { useState, useEffect } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import Carousel from "@/app/site/components/Carousel";
import ImageModal from "@/app/site/components/ImageModal";
import { FaArrowRight, FaUsers, FaBuilding, FaBook, FaHandshake, FaLaptop, FaUserTie, FaUniversity, FaClipboardList, FaGavel, FaGlobe, FaHeartbeat, FaLightbulb, FaChalkboardTeacher, FaBalanceScale, FaPencilRuler, FaRegLightbulb, FaImage } from 'react-icons/fa';
import { BsCameraReelsFill, BsCloudFill, BsDatabaseFill } from 'react-icons/bs';

import Image from 'next/image';


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

// Imágenes de la galería (extraídas a la parte superior)
const galleryImages: { src: string; title: string }[] = [
  { src: "/images/site/galeria/galeria_1.webp", title: "Evento Institucional" },
  { src: "/images/site/galeria/galeria_2.webp", title: "Ceremonia de Graduación" },
  { src: "/images/site/galeria/galeria_3.webp", title: "Taller de Capacitación" },
  { src: "/images/site/galeria/galeria_4.webp", title: "Charlas Educativas" },
  { src: "/images/site/galeria/galeria_5.webp", title: "Actividad Comunitaria" },
  { src: "/images/site/galeria/galeria_6.webp", title: "Foro Profesional" },
  { src: "/images/site/galeria/galeria_7.webp", title: "Juramentación" },
  { src: "/images/site/galeria/galeria_8.webp", title: "Brindis de aniversario" },
  { src: "/images/site/galeria/galeria_9.webp", title: "Jornada de Integración" },
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
  // Estado para controlar el modal de la galería
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para controlar la carga de cada imagen de la galería
  const [loadedGallery, setLoadedGallery] = useState<{ [index: number]: boolean }>({});

  // Array de elementos (imágenes) para el carrusel
  const carouselItems: React.ReactNode[] = [
    <div key="item1" className="flex items-center justify-center bg-gray-200 h-[550px]"><Image src="/images/site/slide/slide_1.webp" alt="Slide 1" width={1200} height={550} className="w-full h-full object-cover" /></div>,
    <div key="item2" className="flex items-center justify-center bg-gray-300 h-[550px]"><Image src="/images/site/slide/slide_2.webp" alt="Slide 2" width={1200} height={550} className="w-full h-full object-cover" /></div>,
    <div key="item3" className="flex items-center justify-center bg-gray-400 h-[550px]"><Image src="/images/site/slide/slide_3.webp" alt="Slide 3" width={1200} height={550} className="w-full h-full object-cover" /></div>,
  ];

  // Función para abrir el modal
  const openModal = (image: { src: string; title: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };


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
                Región VI - Huancayo - Junín - Transformando realidades, construyendo esperanza: trabajadores sociales del Perú, pasión y justicia para un país más humano.
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
                  href="/site/nosotros"
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

        {/* Galeria */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-300"
                  onClick={() => openModal(image)}
                >
                  {/* Skeleton */}
                  {!loadedGallery[index] && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-100" />
                  )}

                  <Image
                    src={image.src}
                    alt={image.title}
                    width={400}
                    height={400}
                    className={`w-full h-full object-cover transition-transform duration-300 ${loadedGallery[index] ? 'group-hover:scale-105 opacity-100' : 'opacity-0'}`}
                    onLoadingComplete={() => setLoadedGallery(prev => ({ ...prev, [index]: true }))}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${loadedGallery[index] ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Facebook */}
        <section className="py-16 bg-white">
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

        {/* Modal para mostrar imagen en pantalla completa */}
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedImage?.src || ""}
          imageAlt={selectedImage?.title || ""}
          imageTitle={selectedImage?.title}
        />

      </div>
    </PageContainer>
  );
}

export default SitePage;
