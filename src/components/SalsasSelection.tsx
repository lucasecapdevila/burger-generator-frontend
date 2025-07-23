'use client';

import { Ingredient } from '@/types';
import Image from 'next/image';

interface SalsasSelectionProps {
  salsas: Ingredient[];
  selectedSalsas: Ingredient[];
  onSalsaToggle: (salsa: Ingredient) => void;
  onSkipSalsas: () => void;
  shouldShowImage: (imageUrl: string | undefined) => boolean;
  handleImageError: (imageUrl: string) => void;
}

export default function SalsasSelection({
  salsas,
  selectedSalsas,
  onSalsaToggle,
  onSkipSalsas,
  shouldShowImage,
  handleImageError
}: SalsasSelectionProps) {
  const isSelected = (salsa: Ingredient) => {
    return selectedSalsas.some(s => s._id === salsa._id);
  };

  return (
    <div>
      {/* No agregar option */}
      <div
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 mb-4 ${
          selectedSalsas.length === 0
            ? 'border-red-500 bg-red-50'
            : 'border-gray-200 hover:border-red-300'
        }`}
        onClick={onSkipSalsas}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">No agregar salsas</h3>
            <p className="text-sm text-gray-600">Continuar sin agregar salsas a la hamburguesa</p>
            <p className="text-xs text-gray-500">Calorías: 0</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-600">$0</p>
          </div>
        </div>
      </div>

      {salsas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay salsas disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {salsas.map((salsa) => {
            const selected = isSelected(salsa);
            
            return (
              <div
                key={salsa._id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selected
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => onSalsaToggle(salsa)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {shouldShowImage(salsa.img) ? (
                        <Image 
                          src={salsa.img!} 
                          alt={salsa.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(salsa.img!)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{salsa.name}</h3>
                    <p className="text-sm text-gray-600">{salsa.description}</p>
                    <p className="text-xs text-gray-500">Calorías: {salsa.calories}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">${salsa.price}</p>
                    {selected && (
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-red-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {selectedSalsas.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-800 mb-2">Salsas seleccionadas:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSalsas.map((salsa) => (
              <span
                key={salsa._id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
              >
                {salsa.name}
                <button
                  onClick={() => onSalsaToggle(salsa)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 