"use client";

import { Ingredient } from "@/types";
import Image from "next/image";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  hamburguesaIngredientes: {
    pan?: Ingredient;
    carne?: Ingredient;
    queso?: Ingredient;
    vegetales: Ingredient[];
    salsas: Ingredient[];
    otros: Ingredient[];
    extras: Ingredient[];
    bebidas: Ingredient[];
  };
  carneCantidad: number;
  quesoCantidad: number;
  precioTotal: number;
  caloriasTotal: number;
  shouldShowImage: (imageUrl: string | undefined) => boolean;
  handleImageError: (imageUrl: string) => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  hamburguesaIngredientes,
  carneCantidad,
  quesoCantidad,
  precioTotal,
  caloriasTotal,
  shouldShowImage,
  handleImageError,
}: OrderModalProps) {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const renderIngredientList = (
    ingredients: Ingredient[],
    title: string,
    cantidad?: number
  ) => {
    if (ingredients.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <div className="space-y-2">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient._id}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
            >
              <div className="flex items-center space-x-3">
                {shouldShowImage(ingredient.img) && ingredient.img && (
                  <Image
                    src={ingredient.img}
                    alt={ingredient.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                    onError={() => handleImageError(ingredient.img!)}
                  />
                )}
                <span className="text-gray-700">{ingredient.name}</span>
              </div>
              <span className="text-orange-600 font-medium">
                {formatPrice(ingredient.price)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Detalles del Pedido</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

        {/* Content */}
        <div className="p-6">
          {/* Pan */}
          {hamburguesaIngredientes.pan && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Pan</h4>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  {shouldShowImage(hamburguesaIngredientes.pan.img) &&
                    hamburguesaIngredientes.pan.img && (
                      <Image
                        src={hamburguesaIngredientes.pan.img}
                        alt={hamburguesaIngredientes.pan.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        onError={() =>
                          hamburguesaIngredientes.pan?.img && handleImageError(hamburguesaIngredientes.pan.img)
                        }
                      />
                    )}
                  <span className="text-gray-700">
                    {hamburguesaIngredientes.pan.name}
                  </span>
                </div>
                <span className="text-orange-600 font-medium">
                  {formatPrice(hamburguesaIngredientes.pan.price)}
                </span>
              </div>
            </div>
          )}

          {/* Carne */}
          {hamburguesaIngredientes.carne && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Carne</h4>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  {shouldShowImage(hamburguesaIngredientes.carne.img) &&
                    hamburguesaIngredientes.carne.img && (
                      <Image
                        src={hamburguesaIngredientes.carne.img}
                        alt={hamburguesaIngredientes.carne.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        onError={() =>
                          hamburguesaIngredientes.carne?.img && handleImageError(hamburguesaIngredientes.carne.img)
                        }
                      />
                    )}
                  <span className="text-gray-700">
                    {hamburguesaIngredientes.carne.name} (x{carneCantidad})
                  </span>
                </div>
                <span className="text-orange-600 font-medium">
                  {formatPrice(
                    hamburguesaIngredientes.carne.price * carneCantidad
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Queso */}
          {hamburguesaIngredientes.queso && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Queso</h4>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  {shouldShowImage(hamburguesaIngredientes.queso.img) &&
                    hamburguesaIngredientes.queso.img && (
                      <Image
                        src={hamburguesaIngredientes.queso.img}
                        alt={hamburguesaIngredientes.queso.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        onError={() =>
                          hamburguesaIngredientes.queso?.img && handleImageError(hamburguesaIngredientes.queso.img)
                        }
                      />
                    )}
                  <span className="text-gray-700">
                    {hamburguesaIngredientes.queso.name} (x{quesoCantidad})
                  </span>
                </div>
                <span className="text-orange-600 font-medium">
                  {formatPrice(
                    hamburguesaIngredientes.queso.price * quesoCantidad
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Otros ingredientes */}
          {renderIngredientList(hamburguesaIngredientes.vegetales, "Vegetales")}
          {renderIngredientList(hamburguesaIngredientes.salsas, "Salsas")}
          {renderIngredientList(
            hamburguesaIngredientes.otros,
            "Otros Ingredientes"
          )}
          {renderIngredientList(hamburguesaIngredientes.extras, "Extras")}
          {renderIngredientList(hamburguesaIngredientes.bebidas, "Bebidas")}

          {/* Resumen */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Total Calorías:
              </span>
              <span className="text-lg font-bold text-orange-600">
                {caloriasTotal} cal
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">
                Precio Total:
              </span>
              <span className="text-2xl font-bold text-orange-600">
                {formatPrice(precioTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                // Aquí se podría agregar la lógica para procesar el pedido
                alert("¡Pedido enviado con éxito! Gracias por tu compra.");
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
