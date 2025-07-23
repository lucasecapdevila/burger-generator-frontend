'use client';

import { Ingredient } from '@/types';
import Image from 'next/image';

interface BebidasSelectionProps {
  bebidas: Ingredient[];
  selectedBebidas: Ingredient[];
  onBebidaToggle: (bebida: Ingredient) => void;
  onSkipBebidas: () => void;
  shouldShowImage: (imageUrl: string | undefined) => boolean;
  handleImageError: (imageUrl: string) => void;
}

export default function BebidasSelection({
  bebidas,
  selectedBebidas,
  onBebidaToggle,
  onSkipBebidas,
  shouldShowImage,
  handleImageError
}: BebidasSelectionProps) {
  const isSelected = (bebida: Ingredient) => {
    return selectedBebidas.some(b => b._id === bebida._id);
  };

  return (
    <div>
      {/* No agregar option */}
      <div
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 mb-4 ${
          selectedBebidas.length === 0
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        }`}
        onClick={onSkipBebidas}
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
            <h3 className="font-semibold text-gray-900">No agregar bebidas</h3>
            <p className="text-sm text-gray-600">Continuar sin agregar bebidas al pedido</p>
            <p className="text-xs text-gray-500">Calorías: 0</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-600">$0</p>
          </div>
        </div>
      </div>

      {bebidas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay bebidas disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bebidas.map((bebida) => {
            const selected = isSelected(bebida);
            
            return (
              <div
                key={bebida._id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => onBebidaToggle(bebida)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {shouldShowImage(bebida.img) ? (
                        <Image 
                          src={bebida.img!} 
                          alt={bebida.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(bebida.img!)}
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
                    <h3 className="font-semibold text-gray-900">{bebida.name}</h3>
                    <p className="text-sm text-gray-600">{bebida.description}</p>
                    <p className="text-xs text-gray-500">Calorías: {bebida.calories}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">${bebida.price}</p>
                    {selected && (
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-blue-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
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
      
      {selectedBebidas.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Bebidas seleccionadas:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedBebidas.map((bebida) => (
              <span
                key={bebida._id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {bebida.name}
                <button
                  onClick={() => onBebidaToggle(bebida)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
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