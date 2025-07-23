'use client';

import { useEffect } from 'react';
import { ingredientsService } from '@/services/ingredients.service';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredients = await ingredientsService.getAllIngredients();
        console.log('Ingredients fetched:', ingredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            🍔 Hamburguesas App
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            La mejor aplicación para gestionar tus hamburguesas favoritas
          </p>
        </div>

        {/* Development Status Card */}
        <div className="max-w-md mx-auto mb-8 sm:mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6 sm:p-8">
            <div className="text-center">
              {/* Development Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-4">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                En Desarrollo
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                🚧 Construyendo algo increíble
              </h2>
              
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                Estamos trabajando arduamente para traerte la mejor experiencia de gestión de hamburguesas. 
                Nuevas funcionalidades estarán disponibles próximamente.
              </p>

              {/* Features Coming Soon */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                  🎯 Próximamente:
                </h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Gestión completa de ingredientes
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Creación de hamburguesas personalizadas
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Sistema de pedidos y carrito
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Panel de administración
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progreso</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{width: '25%'}}></div>
                </div>
              </div>

              {/* Status Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-blue-800">
                  <span className="font-medium">Estado actual:</span> Cargando ingredientes desde la API...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Features Preview */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-center">
            Funcionalidades Actuales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
              <div className="text-2xl mb-3">🍅</div>
              <h4 className="font-semibold text-gray-900 mb-2">Ingredientes</h4>
              <p className="text-sm text-gray-600">Visualización de ingredientes disponibles</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
              <div className="text-2xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">Responsive</h4>
              <p className="text-sm text-gray-600">Diseño optimizado para móviles</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
              <div className="text-2xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Rápido</h4>
              <p className="text-sm text-gray-600">Interfaz moderna y veloz</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6 sm:p-8 max-w-md mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              🎨 ¿Quieres probar?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Explora la funcionalidad de creación de hamburguesas que estamos desarrollando
            </p>
            <Link 
              href="/crear-hamburguesa"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear Hamburguesa
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
