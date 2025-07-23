'use client';

import { Ingredient } from '@/types';
import Image from 'next/image';

interface HamburgerSummaryProps {
  hamburguesaIngredientes: {
    pan?: Ingredient;
    carne?: Ingredient;
    queso?: Ingredient;
    vegetales: Ingredient[];
    salsas: Ingredient[];
    extras: Ingredient[];
    bebidas: Ingredient[];
    otros: Ingredient[];
  };
  carneCantidad: number;
  quesoCantidad: number;
  precioTotal: number;
  caloriasTotal: number;
  shouldShowImage: (imageUrl: string | undefined) => boolean;
  handleImageError: (imageUrl: string) => void;
}

export default function HamburgerSummary({
  hamburguesaIngredientes,
  carneCantidad,
  quesoCantidad,
  precioTotal,
  caloriasTotal,
  shouldShowImage,
  handleImageError
}: HamburgerSummaryProps) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg border border-orange-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Resumen de tu Hamburguesa</h3>
          <div className="space-y-3">
            {hamburguesaIngredientes.pan && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  {shouldShowImage(hamburguesaIngredientes.pan?.img) ? (
                    <Image 
                      src={hamburguesaIngredientes.pan!.img!} 
                      alt={hamburguesaIngredientes.pan!.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(hamburguesaIngredientes.pan!.img!)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">🍞 Pan: {hamburguesaIngredientes.pan.name}</p>
                  <p className="text-xs text-gray-500">${hamburguesaIngredientes.pan.price}</p>
                </div>
              </div>
            )}
            {hamburguesaIngredientes.carne && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  {shouldShowImage(hamburguesaIngredientes.carne?.img) ? (
                    <Image 
                      src={hamburguesaIngredientes.carne!.img!} 
                      alt={hamburguesaIngredientes.carne!.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(hamburguesaIngredientes.carne!.img!)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">🥩 Carne: {hamburguesaIngredientes.carne.name}</p>
                  <p className="text-xs text-gray-500">
                    ${hamburguesaIngredientes.carne.price} × {carneCantidad} = ${hamburguesaIngredientes.carne.price * carneCantidad}
                  </p>
                </div>
              </div>
            )}
            {hamburguesaIngredientes.queso && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  {shouldShowImage(hamburguesaIngredientes.queso?.img) ? (
                    <Image 
                      src={hamburguesaIngredientes.queso!.img!} 
                      alt={hamburguesaIngredientes.queso!.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(hamburguesaIngredientes.queso!.img!)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">🧀 Queso: {hamburguesaIngredientes.queso.name}</p>
                  <p className="text-xs text-gray-500">
                    {(() => {
                      const isMelted = hamburguesaIngredientes.queso.name.toLowerCase().includes('fundido') || 
                                     hamburguesaIngredientes.queso.name.toLowerCase().includes('melted') || 
                                     hamburguesaIngredientes.queso.name.toLowerCase().includes('derretido');
                      if (isMelted) {
                        return `$${hamburguesaIngredientes.queso.price}`;
                      } else {
                        return `$${hamburguesaIngredientes.queso.price} × ${quesoCantidad} = $${hamburguesaIngredientes.queso.price * quesoCantidad}`;
                      }
                    })()}
                  </p>
                </div>
              </div>
            )}
            {hamburguesaIngredientes.vegetales && hamburguesaIngredientes.vegetales.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">🥬 Vegetales:</p>
                {hamburguesaIngredientes.vegetales.map((vegetal) => (
                  <div key={vegetal._id} className="flex items-center space-x-3 ml-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {shouldShowImage(vegetal.img) ? (
                        <Image 
                          src={vegetal.img!} 
                          alt={vegetal.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(vegetal.img!)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{vegetal.name}</p>
                      <p className="text-xs text-gray-500">${vegetal.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hamburguesaIngredientes.salsas && hamburguesaIngredientes.salsas.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">🍅 Salsas:</p>
                {hamburguesaIngredientes.salsas.map((salsa) => (
                  <div key={salsa._id} className="flex items-center space-x-3 ml-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {shouldShowImage(salsa.img) ? (
                        <Image 
                          src={salsa.img!} 
                          alt={salsa.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(salsa.img!)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{salsa.name}</p>
                      <p className="text-xs text-gray-500">${salsa.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hamburguesaIngredientes.extras && hamburguesaIngredientes.extras.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">⭐ Extras:</p>
                {hamburguesaIngredientes.extras.map((extra) => (
                  <div key={extra._id} className="flex items-center space-x-3 ml-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {shouldShowImage(extra.img) ? (
                        <Image 
                          src={extra.img!} 
                          alt={extra.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(extra.img!)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{extra.name}</p>
                      <p className="text-xs text-gray-500">${extra.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hamburguesaIngredientes.bebidas && hamburguesaIngredientes.bebidas.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">🥤 Bebidas:</p>
                {hamburguesaIngredientes.bebidas.map((bebida) => (
                  <div key={bebida._id} className="flex items-center space-x-3 ml-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {shouldShowImage(bebida.img) ? (
                        <Image 
                          src={bebida.img!} 
                          alt={bebida.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(bebida.img!)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{bebida.name}</p>
                      <p className="text-xs text-gray-500">${bebida.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hamburguesaIngredientes.otros && hamburguesaIngredientes.otros.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">🔧 Otros:</p>
                {hamburguesaIngredientes.otros.map((otro) => (
                  <div key={otro._id} className="flex items-center space-x-3 ml-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {shouldShowImage(otro.img) ? (
                        <Image 
                          src={otro.img!} 
                          alt={otro.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(otro.img!)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{otro.name}</p>
                      <p className="text-xs text-gray-500">${otro.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!hamburguesaIngredientes.pan && !hamburguesaIngredientes.carne && !hamburguesaIngredientes.queso && hamburguesaIngredientes.vegetales.length === 0 && hamburguesaIngredientes.salsas.length === 0 && hamburguesaIngredientes.extras.length === 0 && hamburguesaIngredientes.bebidas.length === 0 && hamburguesaIngredientes.otros.length === 0 && (
              <p className="text-sm text-gray-600">Selecciona pan y carne para continuar</p>
            )}
          </div>
          {caloriasTotal > 0 && (
            <p className="text-xs text-gray-500 mt-2">Calorías totales: {caloriasTotal}</p>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600 mb-2">
            ${precioTotal}
          </div>
          <p className="text-sm text-gray-500">Precio total</p>
        </div>
      </div>
    </div>
  );
} 