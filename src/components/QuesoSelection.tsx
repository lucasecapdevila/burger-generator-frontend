'use client';

import { Ingredient } from '@/types';
import Image from 'next/image';

interface QuesoSelectionProps {
  quesos: Ingredient[];
  selectedQueso?: Ingredient;
  quesoCantidad: number;
  onQuesoSelect: (queso: Ingredient | null) => void;
  onCantidadChange: (cantidad: number) => void;
  shouldShowImage: (imageUrl: string | undefined) => boolean;
  handleImageError: (imageUrl: string) => void;
}

export default function QuesoSelection({
  quesos,
  selectedQueso,
  quesoCantidad,
  onQuesoSelect,
  onCantidadChange,
  shouldShowImage,
  handleImageError
}: QuesoSelectionProps) {
  // Helper function to check if cheese is melted cheese
  const isMeltedCheese = (queso: Ingredient): boolean => {
    const name = queso.name.toLowerCase();
    return name.includes('fundido') || name.includes('melted') || name.includes('derretido');
  };

  return (
    <div>
      {/* No agregar option */}
      <div
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 mb-4 ${
          !selectedQueso
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-200 hover:border-orange-300'
        }`}
        onClick={() => onQuesoSelect(null)}
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
            <h3 className="font-semibold text-gray-900">No agregar queso</h3>
            <p className="text-sm text-gray-600">Continuar sin agregar queso a la hamburguesa</p>
            <p className="text-xs text-gray-500">Calorías: 0</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-600">$0</p>
          </div>
        </div>
      </div>

      {quesos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay quesos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quesos.map((queso) => {
            const isSelected = selectedQueso?._id === queso._id;
            const currentCantidad = isSelected ? quesoCantidad : 0;
            const isMelted = isMeltedCheese(queso);
            
            return (
              <div
                key={queso._id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => onQuesoSelect(queso)}
              >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                    {shouldShowImage(queso.img) ? (
                      <Image 
                        src={queso.img!} 
                        alt={queso.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(queso.img!)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{queso.name}</h3>
                  <p className="text-sm text-gray-600">{queso.description}</p>
                  <p className="text-xs text-gray-500">Calorías: {queso.calories}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">${queso.price}</p>
                </div>
              </div>
              
              {/* Quantity selector - only show for selected cheese that is not melted */}
              {isSelected && !isMelted && (
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cantidad de fetas:</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCantidadChange(currentCantidad - 1);
                        }}
                        disabled={currentCantidad <= 0}
                        className="w-8 h-8 rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="text-lg font-bold text-gray-900 min-w-[2rem] text-center">
                        {currentCantidad}
                      </span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCantidadChange(currentCantidad + 1);
                        }}
                        disabled={currentCantidad >= 4}
                        className="w-8 h-8 rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    Total: ${queso.price * currentCantidad} ({currentCantidad} × ${queso.price})
                  </div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
} 