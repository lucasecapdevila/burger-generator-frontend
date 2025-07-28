'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isActiveRoute } from '@/routes/public.routes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-white">
                Hamburguesas App
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(pathname, '/') 
                    ? 'bg-orange-700 text-white' 
                    : 'hover:bg-orange-700'
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/crear-hamburguesa"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(pathname, '/crear-hamburguesa') 
                    ? 'bg-orange-700 text-white' 
                    : 'hover:bg-orange-700'
                }`}
              >
                Crear Hamburguesa
              </Link>
              <Link
                href="/menu"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(pathname, '/menu') 
                    ? 'bg-orange-700 text-white' 
                    : 'hover:bg-orange-700'
                }`}
              >
                Menú
              </Link>
              <Link
                href="/acerca-de"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(pathname, '/acerca-de') 
                    ? 'bg-orange-700 text-white' 
                    : 'hover:bg-orange-700'
                }`}
              >
                Acerca de
              </Link>
              <Link
                href="/contacto"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(pathname, '/contacto') 
                    ? 'bg-orange-700 text-white' 
                    : 'hover:bg-orange-700'
                }`}
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} md:hidden transition-all duration-500 ease-in-out overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActiveRoute(pathname, '/') 
                ? 'bg-orange-700 text-white' 
                : 'hover:bg-orange-700'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/crear-hamburguesa"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActiveRoute(pathname, '/crear-hamburguesa') 
                ? 'bg-orange-700 text-white' 
                : 'hover:bg-orange-700'
            }`}
          >
            Crear Hamburguesa
          </Link>
          <Link
            href="/menu"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActiveRoute(pathname, '/menu') 
                ? 'bg-orange-700 text-white' 
                : 'hover:bg-orange-700'
            }`}
          >
            Menú
          </Link>
          <Link
            href="/acerca-de"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActiveRoute(pathname, '/acerca-de') 
                ? 'bg-orange-700 text-white' 
                : 'hover:bg-orange-700'
            }`}
          >
            Acerca de
          </Link>
          <Link
            href="/contacto"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActiveRoute(pathname, '/contacto') 
                ? 'bg-orange-700 text-white' 
                : 'hover:bg-orange-700'
            }`}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
} 