'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function CrearHamburguesa() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            🍔 Crear Hamburguesa
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Diseña tu hamburguesa perfecta seleccionando tus ingredientes favoritos
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-md mx-auto mb-8 sm:mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6 sm:p-8">
            <div className="text-center">
              {/* Development Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-4">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                Próximamente
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                🎨 Constructor de Hamburguesas
              </h2>
              
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                Esta funcionalidad estará disponible muy pronto. Podrás crear hamburguesas personalizadas 
                seleccionando pan, carne, vegetales, salsas y más ingredientes.
              </p>

              {/* Features Preview */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                  🎯 Lo que podrás hacer:
                </h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Seleccionar tipo de pan
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Elegir carne y cocción
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Agregar vegetales y salsas
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Ver precio en tiempo real
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 