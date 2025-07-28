'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ComingSoonProps {
  title?: string;
  description?: string;
  features?: string[];
  progress?: number;
  status?: string;
}

const ComingSoon = ({ 
  title = "🚧 Construyendo algo increíble",
  description = "Estamos trabajando arduamente para traerte la mejor experiencia de gestión de hamburguesas. Nuevas funcionalidades estarán disponibles próximamente.",
  features = [
    "Gestión completa de ingredientes",
    "Creación de hamburguesas personalizadas", 
    "Sistema de pedidos y carrito",
    "Panel de administración",
    "Historial de pedidos",
    "Sistema de notificaciones"
  ],
  progress = 25,
  status = "Cargando ingredientes desde la API..."
}: ComingSoonProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 h-[calc(100vh-4rem)] flex items-center justify-center">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-lg mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 p-6 sm:p-8 transform transition-all duration-700 ease-out hover:scale-105">
            <div className="text-center">
              {/* Animated Development Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 mb-4 border border-orange-200 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                En Desarrollo
              </div>

              {/* Main Title */}
              <h1 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {title}
              </h1>

              {/* Description */}
              <p className={`text-sm sm:text-base text-gray-600 mb-6 leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {description}
              </p>

              {/* Features Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <span className="text-xs font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Enhanced Progress Bar */}
              <div className={`mb-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-2">
                  <span>Progreso del desarrollo</span>
                  <span className="text-orange-600">{animatedProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${animatedProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Card */}
              <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 mb-6 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-center">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-xs font-medium text-blue-800">
                    <span className="font-semibold">Estado actual:</span> {status}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Link
                  href="/crear-hamburguesa"
                  className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Probar Funcionalidad
                </Link>
                
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Volver al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;
