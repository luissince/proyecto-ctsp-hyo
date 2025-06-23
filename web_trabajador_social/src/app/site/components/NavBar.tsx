"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import SocialMidea from './SocialMidea';

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SocialMidea />
      
      {/* El nav ahora es el contenedor principal.
          Aseguramos que su `top` sea justo después del SocialMidea. */}
      <nav className="fixed top-[40px] left-0 w-full z-50 bg-blue-900 bg-opacity-90 text-white shadow opacity-95">
        <div className="container mx-auto relative flex justify-end items-center h-16 md:h-20"> {/* Altura base del nav */}
          {/* Logo - Posicionado absolutamente para que sobresalga hacia ABAJO */}
          {/* Usamos 'bottom-0' y 'left-4' para anclarlo a la parte inferior izquierda de la nav.
              El 'transform -translate-y-1/2' levanta un poco el logo si quieres que se centre
              o 'transform translate-y-1/2' si quieres que se baje más y sobresalga más.
              Para que sobresalga solo hacia abajo y no tape el SocialMidea, simplemente lo anclamos a la parte inferior
              del nav y le damos el tamaño deseado.
          */}
          <Link href="/site" className="absolute bottom-0 left-4 md:left-6 z-50"> 
            <img 
              src="/logo_ctsp.webp" 
              alt="CTSP Logo" 
              className="w-18 md:w-21 h-auto object-contain" // Tamaño del logo. w-24 es 96px, w-32 es 128px
            />
          </Link>

          {/* Botón de hamburguesa - visible solo en pantallas pequeñas */}
          {/* Posicionamos a la derecha para que no haya conflicto con el logo. */}
          <button
            className="md:hidden text-white focus:outline-none absolute right-4 top-1/2 -translate-y-1/2 z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Menú de navegación - siempre alineado a la derecha */}
          <ul className={`
            ${isOpen ? 'block' : 'hidden'}
            absolute top-full right-0 w-full bg-blue-800 shadow-md
            md:relative md:flex md:space-x-6 md:space-y-0 md:block md:bg-transparent md:shadow-none md:top-auto md:right-auto md:w-auto
            flex flex-col md:flex-row justify-end md:justify-end space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0
          `}>
            <li>
              <Link href="/site" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site' ? 'underline underline-offset-8 font-bold' : ''}`}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/site/noticias" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site/noticias' ? 'underline underline-offset-8 font-bold' : ''}`}>
                Noticias
              </Link>
            </li>
            <li className="relative group">
              <Link href="/site/colegiado" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded flex items-center ${pathname.startsWith('/site/colegiado') ? 'underline underline-offset-8 font-bold' : ''}`}>
                Colegiado
                <span className="ml-1 text-[10px] transition-transform duration-300 group-hover:-rotate-180">
                  ▼
                </span>
              </Link>
              <ul className="absolute left-0 mt-2 w-48 bg-white text-blue-700 rounded-md shadow-lg z-[60] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                <li>
                  <Link href="/site/colegiado/consulta" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">
                    Consulta de colegiado
                  </Link>
                </li>
                <li>
                  <Link href="/site/colegiado/requisitos" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">
                    Requisitos
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/site/institucional" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site/institucional' ? 'underline underline-offset-8 font-bold' : ''}`}>
                Institucional
              </Link>
            </li>
            <li>
              <Link href="/site/cursos" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site/cursos' ? 'underline underline-offset-8 font-bold' : ''}`}>
                Cursos
              </Link>
            </li>
            <li>
              <Link href="/site/diplomado" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site/diplomado' ? 'underline underline-offset-8 font-bold' : ''}`}>
                Diplomados
              </Link>
            </li>
          </ul>
        </div>
      </nav>

 
    </>
  );
}