"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

import SocialMidea from './SocialMidea';

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Rutas que activan el estado de INSTITUCIONAL
  const institutionalRoutes = ['/site/historia', '/site/consejo', '/site/nosotros', '/site/institucional'];
  const isInstitutionalActive = institutionalRoutes.some(route => pathname?.startsWith(route));

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Evitar renderizado durante la hidratación
  if (!mounted) {
    return (
      <>
        <SocialMidea />
        <nav className="fixed top-[40px] left-0 w-full z-50 bg-blue-900 bg-opacity-90 text-white shadow opacity-95">
          <div className="container mx-auto relative flex justify-end items-center h-16 md:h-20">
            <Link href="/site" className="absolute bottom-0 left-4 md:left-6 z-50">
              <Image
                src="/logo_ctsp.webp"
                alt="CTSP Logo"
                width={96}
                height={48}
                className="w-18 md:w-21 h-auto object-contain"
              />
            </Link>
            <button
              className="md:hidden text-white focus:outline-none absolute right-4 top-1/2 -translate-y-1/2 z-50"
              aria-label="Toggle menu"
            >
              <FaBars size={24} />
            </button>
            <ul className="absolute top-full right-0 w-full bg-blue-800 shadow-md md:relative md:flex md:space-x-6 md:space-y-0 md:block md:bg-transparent md:shadow-none md:top-auto md:right-auto md:w-auto flex flex-col md:flex-row justify-end md:justify-end space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li><Link href="/site" className="px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded">INICIO</Link></li>

              <li className="relative group">
                <span className="px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded cursor-pointer">
                  INSTITUCIONAL
                  <span className="ml-1 text-[10px] transition-transform duration-300 group-hover:-rotate-180">▼</span>
                </span>
                <ul className="absolute left-0 mt-2 bg-white text-blue-700 rounded-md shadow-lg z-[60] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 min-w-[220px]">
                  <li><Link href="/site/historia" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">HISTORIA</Link></li>
                  <li><Link href="/site/consejo" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">CONSEJO DIRECTIVO</Link></li>
                  <li><Link href="/site/nosotros" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">NOSOTROS</Link></li>
                </ul>
              </li>

              <li><Link href="/site/eventos" className="px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded">EVENTOS</Link></li>
              <li><Link href="/site/colegiatura" className="px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded">COLEGIATURA</Link></li>
              <li>
                <Link title="BUSQUEDA DE COLEGIADO" href="/site/consulta" className="px-3 py-2 font-bold rounded-lg text-white bg-sky-600 hover:bg-white hover:text-blue-700">
                  BUSQUEDA
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <SocialMidea />

      <nav className="fixed top-[40px] left-0 w-full z-50 bg-blue-900 bg-opacity-90 text-white shadow opacity-95">
        <div className="container mx-auto relative flex justify-end items-center h-16 md:h-20">
          <Link href="/site" className="absolute bottom-0 left-4 md:left-6 z-50">
            <Image
              src="/logo_ctsp.webp"
              alt="CTSP Logo"
              width={96}
              height={48}
              className="w-18 md:w-21 h-auto object-contain"
            />
          </Link>

          <button
            className="md:hidden text-white focus:outline-none absolute right-4 top-1/2 -translate-y-1/2 z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <ul className={`
            ${isOpen ? 'block' : 'hidden'}
            absolute top-full right-0 w-full bg-blue-800 shadow-md
            md:relative md:flex md:space-x-6 md:space-y-0 md:block md:bg-transparent md:shadow-none md:top-auto md:right-auto md:w-auto
            flex flex-col md:flex-row justify-end md:justify-end space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0
          `}>
            <li>
              <Link href="/site" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                INICIO
              </Link>
            </li>

            <li className="relative group">
              <span className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded cursor-pointer ${isInstitutionalActive ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                INSTITUCIONAL
                <span className="ml-1 text-[10px] transition-transform duration-300 group-hover:-rotate-180">
                  ▼
                </span>
              </span>
              <ul className="absolute left-0 mt-2 bg-white text-blue-700 rounded-md shadow-lg z-[60] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 min-w-[220px]">
                <li>
                  <Link href="/site/historia" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">
                    HISTORIA
                  </Link>
                </li>
                <li>
                  <Link href="/site/consejo" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">
                    CONSEJO DIRECTIVO
                  </Link>
                </li>
                <li>
                  <Link href="/site/nosotros" className="block px-4 py-2 hover:text-white hover:bg-blue-700 rounded-md">
                    NOSOTROS
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href="/site/eventos" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site/eventos' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                EVENTOS
              </Link>
            </li>
            <li>
              <Link href="/site/colegiatura" className={`px-3 py-2 hover:bg-white hover:text-blue-700 hover:rounded ${pathname === '/site/colegiatura' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                COLEGIATURA
              </Link>
            </li>
            <li>
              <Link title="BUSQUEDA DE COLEGIADO"  href="/site/consulta" className={`px-3 py-2 font-bold rounded-lg text-white bg-sky-600 hover:bg-white hover:text-blue-700 ${pathname === '/site/consulta' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                <span className="">BUSQUEDA</span>
              </Link>
            </li>
          </ul>
          
        </div>
      </nav> 
    </>
    
  );
}