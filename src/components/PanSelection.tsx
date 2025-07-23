'use client';

import { Ingredient } from '@/types';
import Image from 'next/image';

interface PanSelectionProps {
  panes: Ingredient[];
  selectedPan?: Ingredient;
  onPanSelect: (pan: Ingredient) => void;
  shouldShowImage: (imageUrl: string | undefined) => boolean;
  handleImageError: (imageUrl: string) => void;
}

export default function PanSelection({
  panes,
  selectedPan,
  onPanSelect,
  shouldShowImage,
  handleImageError
}: PanSelectionProps) {
  return (
    <div>
      {panes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay panes disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panes.map((pan) => (
            <div
              key={pan._id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedPan?._id === pan._id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
              onClick={() => onPanSelect(pan)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                    {shouldShowImage(pan.img) ? (
                      <Image 
                        src={pan.img!} 
                        alt={pan.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(pan.img!)}
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
                  <h3 className="font-semibold text-gray-900">{pan.name}</h3>
                  <p className="text-sm text-gray-600">{pan.description}</p>
                  <p className="text-xs text-gray-500">Calorías: {pan.calories}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">${pan.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 