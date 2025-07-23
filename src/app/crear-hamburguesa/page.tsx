'use client';

import { useEffect, useState } from 'react';
import { ingredientsService } from '@/services/ingredients.service';
import { Ingredient } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  setPan, 
  setCarne, 
  setCarneCantidad, 
  setQueso, 
  setQuesoCantidad, 
  removerQueso, 
  agregarVegetal, 
  removerVegetal, 
  limpiarVegetales,
  agregarSalsa,
  removerSalsa,
  limpiarSalsas,
  agregarOtro,
  removerOtro,
  limpiarOtros,
  agregarExtra,
  removerExtra,
  limpiarExtras,
  agregarBebida,
  removerBebida,
  limpiarBebidas
} from '@/store/slices/hamburguesaSlice';
import Link from 'next/link';
import PanSelection from '@/components/PanSelection';
import CarneSelection from '@/components/CarneSelection';
import QuesoSelection from '@/components/QuesoSelection';
import VegetalesSelection from '@/components/VegetalesSelection';
import SalsasSelection from '@/components/SalsasSelection';
import OtrosSelection from '@/components/OtrosSelection';
import ExtrasSelection from '@/components/ExtrasSelection';
import BebidasSelection from '@/components/BebidasSelection';
import ProgressSteps from '@/components/ProgressSteps';
import HamburgerSummary from '@/components/HamburgerSummary';
import OrderModal from '@/components/OrderModal';

export default function CrearHamburguesa() {
  const dispatch = useAppDispatch();
  const { ingredientes: hamburguesaIngredientes, carneCantidad, quesoCantidad, precioTotal, caloriasTotal } = useAppSelector(state => state.hamburguesa);
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState<'pan' | 'carne' | 'queso' | 'vegetales' | 'salsas' | 'otros' | 'extras' | 'bebidas'>('pan');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  const shouldShowImage = (imageUrl: string | undefined): boolean => {
    return !!(imageUrl && !imageErrors.has(imageUrl));
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const ingredientsData = await ingredientsService.getAllIngredients();
        setIngredients(ingredientsData);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setError("Error al cargar los ingredientes");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const panes = ingredients.filter(ing => ing.category === 'Pan');
  const carnes = ingredients.filter(ing => ing.category === 'Carne');
  const quesos = ingredients.filter(ing => ing.category === 'Queso');
  const vegetales = ingredients.filter(ing => ing.category === 'Vegetales');
  const salsas = ingredients.filter(ing => ing.category === 'Salsas');
  const otros = ingredients.filter(ing => ing.category === 'Otros');
  const extras = ingredients.filter(ing => ing.category === 'Extras');
  const bebidas = ingredients.filter(ing => ing.category === 'Bebidas');

  const handlePanSelection = (pan: Ingredient) => {
    dispatch(setPan(pan));
    setCurrentStep('carne');
  };

  const handleCarneSelection = (carne: Ingredient) => {
    dispatch(setCarne(carne));
    dispatch(setCarneCantidad(1));
    // No avanzamos automáticamente, el usuario debe ajustar la cantidad primero
  };

  const handleQuesoSelection = (queso: Ingredient | null) => {
    if (queso) {
      dispatch(setQueso(queso));
      // The quantity will be set automatically in the Redux slice based on cheese type
    } else {
      dispatch(removerQueso());
    }
  };

  const handleCantidadChange = (cantidad: number) => {
    dispatch(setCarneCantidad(cantidad));
  };

  const handleQuesoCantidadChange = (cantidad: number) => {
    dispatch(setQuesoCantidad(cantidad));
  };

  const handleVegetalToggle = (vegetal: Ingredient) => {
    const isSelected = hamburguesaIngredientes.vegetales.some(v => v._id === vegetal._id);
    if (isSelected) {
      dispatch(removerVegetal(vegetal._id));
    } else {
      dispatch(agregarVegetal(vegetal));
    }
  };

  const handleSkipVegetales = () => {
    dispatch(limpiarVegetales());
  };

  const handleSalsaToggle = (salsa: Ingredient) => {
    const isSelected = hamburguesaIngredientes.salsas.some(s => s._id === salsa._id);
    if (isSelected) {
      dispatch(removerSalsa(salsa._id));
    } else {
      dispatch(agregarSalsa(salsa));
    }
  };

  const handleSkipSalsas = () => {
    dispatch(limpiarSalsas());
  };

  const handleOtroToggle = (otro: Ingredient) => {
    const isSelected = hamburguesaIngredientes.otros.some(o => o._id === otro._id);
    if (isSelected) {
      dispatch(removerOtro(otro._id));
    } else {
      dispatch(agregarOtro(otro));
    }
  };

  const handleSkipOtros = () => {
    dispatch(limpiarOtros());
  };

  const handleExtraToggle = (extra: Ingredient) => {
    const isSelected = hamburguesaIngredientes.extras.some(e => e._id === extra._id);
    if (isSelected) {
      dispatch(removerExtra(extra._id));
    } else {
      dispatch(agregarExtra(extra));
    }
  };

  const handleSkipExtras = () => {
    dispatch(limpiarExtras());
  };

  const handleBebidaToggle = (bebida: Ingredient) => {
    const isSelected = hamburguesaIngredientes.bebidas.some(b => b._id === bebida._id);
    if (isSelected) {
      dispatch(removerBebida(bebida._id));
    } else {
      dispatch(agregarBebida(bebida));
    }
  };

  const handleSkipBebidas = () => {
    dispatch(limpiarBebidas());
  };

  // Navigation handlers
  const handleBackToPan = () => setCurrentStep('pan');
  const handleBackToCarne = () => setCurrentStep('carne');
  const handleBackToQueso = () => setCurrentStep('queso');
  const handleBackToVegetales = () => setCurrentStep('vegetales');
  const handleBackToSalsas = () => setCurrentStep('salsas');
  const handleBackToOtros = () => setCurrentStep('otros');
  const handleBackToExtras = () => setCurrentStep('extras');

  const handleContinueToQueso = () => setCurrentStep('queso');
  const handleContinueToVegetales = () => setCurrentStep('vegetales');
  const handleContinueToSalsas = () => setCurrentStep('salsas');
  const handleContinueToOtros = () => setCurrentStep('otros');
  const handleContinueToExtras = () => setCurrentStep('extras');
  const handleContinueToBebidas = () => setCurrentStep('bebidas');

  const getStepTitle = () => {
    switch (currentStep) {
      case 'pan':
        return 'Paso 1: Selecciona tu Pan';
      case 'carne':
        return 'Paso 2: Selecciona tu Carne';
      case 'queso':
        return 'Paso 3: Selecciona tu Queso (Opcional)';
      case 'vegetales':
        return 'Paso 4: Selecciona tus Vegetales (Opcional)';
      case 'salsas':
        return 'Paso 5: Selecciona tus Salsas (Opcional)';
      case 'otros':
        return 'Paso 6: Selecciona Otros Ingredientes (Opcional)';
      case 'extras':
        return 'Paso 7: Selecciona tus Extras (Opcional)';
      case 'bebidas':
        return 'Paso 8: Selecciona tus Bebidas (Opcional)';
      default:
        return 'Selecciona tu Ingrediente';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 'pan':
        return 'Elige el tipo de pan que más te guste para tu hamburguesa';
      case 'carne':
        return 'Selecciona la carne que prefieras y ajusta la cantidad';
      case 'queso':
        return 'Elige el queso que más te guste o continúa sin queso';
      case 'vegetales':
        return 'Selecciona los vegetales que más te gusten o continúa sin vegetales';
      case 'salsas':
        return 'Selecciona las salsas que más te gusten o continúa sin salsas';
      case 'otros':
        return 'Selecciona otros ingredientes que más te gusten o continúa sin otros';
      case 'extras':
        return 'Selecciona los extras que más te gusten o continúa sin extras';
      case 'bebidas':
        return 'Selecciona las bebidas que más te gusten o continúa sin bebidas';
      default:
        return 'Selecciona tu ingrediente';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando ingredientes...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-800">{error}</p>
              <Link 
                href="/"
                className="inline-flex items-center px-4 py-2 mt-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Crear Hamburguesa
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Diseña tu hamburguesa perfecta seleccionando tus ingredientes favoritos paso a paso
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps
          currentStep={currentStep}
          hasPan={!!hamburguesaIngredientes.pan}
          hasCarne={!!hamburguesaIngredientes.carne}
          hasQueso={!!hamburguesaIngredientes.queso}
          hasVegetales={hamburguesaIngredientes.vegetales.length > 0}
          hasSalsas={hamburguesaIngredientes.salsas.length > 0}
          hasOtros={hamburguesaIngredientes.otros.length > 0}
          hasExtras={hamburguesaIngredientes.extras.length > 0}
          hasBebidas={hamburguesaIngredientes.bebidas.length > 0}
        />

        {/* Current Step Selection */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-gray-600">{getStepDescription()}</p>
            </div>

            {currentStep === 'pan' && (
              <PanSelection
                panes={panes}
                selectedPan={hamburguesaIngredientes.pan}
                onPanSelect={handlePanSelection}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}

            {currentStep === 'carne' && (
              <CarneSelection
                carnes={carnes}
                selectedCarne={hamburguesaIngredientes.carne}
                carneCantidad={carneCantidad}
                onCarneSelect={handleCarneSelection}
                onCantidadChange={handleCantidadChange}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}

            {currentStep === 'queso' && (
              <QuesoSelection
                quesos={quesos}
                selectedQueso={hamburguesaIngredientes.queso}
                quesoCantidad={quesoCantidad}
                onQuesoSelect={handleQuesoSelection}
                onCantidadChange={handleQuesoCantidadChange}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}

            {currentStep === 'vegetales' && (
              <VegetalesSelection
                vegetales={vegetales}
                selectedVegetales={hamburguesaIngredientes.vegetales}
                onVegetalToggle={handleVegetalToggle}
                onSkipVegetales={handleSkipVegetales}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}

            {currentStep === 'salsas' && (
              <SalsasSelection
                salsas={salsas}
                selectedSalsas={hamburguesaIngredientes.salsas}
                onSalsaToggle={handleSalsaToggle}
                onSkipSalsas={handleSkipSalsas}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}

            {currentStep === 'otros' && (
              <OtrosSelection
                otros={otros}
                selectedOtros={hamburguesaIngredientes.otros}
                onOtroToggle={handleOtroToggle}
                onSkipOtros={handleSkipOtros}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}

            {currentStep === 'extras' && (
              <ExtrasSelection
                extras={extras}
                selectedExtras={hamburguesaIngredientes.extras}
                onExtraToggle={handleExtraToggle}
                onSkipExtras={handleSkipExtras}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}

            {currentStep === 'bebidas' && (
              <BebidasSelection
                bebidas={bebidas}
                selectedBebidas={hamburguesaIngredientes.bebidas}
                onBebidaToggle={handleBebidaToggle}
                onSkipBebidas={handleSkipBebidas}
                shouldShowImage={shouldShowImage}
                handleImageError={handleImageError}
              />
            )}
          </div>

          {/* Summary and Actions */}
          <HamburgerSummary
            hamburguesaIngredientes={hamburguesaIngredientes}
            carneCantidad={carneCantidad}
            quesoCantidad={quesoCantidad}
            precioTotal={precioTotal}
            caloriasTotal={caloriasTotal}
            shouldShowImage={shouldShowImage}
            handleImageError={handleImageError}
          />

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Inicio
            </Link>
            
            {/* Botón Finalizar Pedido - solo se muestra al final (paso bebidas) */}
            {currentStep === 'bebidas' && hamburguesaIngredientes.pan && hamburguesaIngredientes.carne && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Finalizar Pedido
              </button>
            )}
            
            {/* Navigation buttons for each step */}
            {currentStep === 'carne' && hamburguesaIngredientes.pan && (
              <button
                onClick={handleBackToPan}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Seleccionar Pan
              </button>
            )}

            {currentStep === 'carne' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleContinueToQueso}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Continuar a Queso
              </button>
            )}

            {currentStep === 'queso' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleBackToCarne}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Seleccionar Carne
              </button>
            )}

            {currentStep === 'queso' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleContinueToVegetales}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Continuar a Vegetales
              </button>
            )}

            {currentStep === 'vegetales' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleBackToQueso}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Seleccionar Queso
              </button>
            )}

            {currentStep === 'vegetales' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleContinueToSalsas}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Continuar a Salsas
              </button>
            )}

            {currentStep === 'salsas' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleBackToVegetales}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Seleccionar Vegetales
              </button>
            )}

            {currentStep === 'salsas' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleContinueToOtros}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Continuar a Otros
              </button>
            )}

            {currentStep === 'otros' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleBackToSalsas}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Seleccionar Salsas
              </button>
            )}

            {currentStep === 'otros' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleContinueToExtras}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Continuar a Extras
              </button>
            )}

            {currentStep === 'extras' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleBackToOtros}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Seleccionar Otros
              </button>
            )}

            {currentStep === 'extras' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleContinueToBebidas}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Continuar a Bebidas
              </button>
            )}

            {currentStep === 'bebidas' && hamburguesaIngredientes.carne && (
              <button
                onClick={handleBackToExtras}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Seleccionar Extras
              </button>
            )}
            
          </div>
        </div>

        {/* Modal de detalles del pedido */}
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hamburguesaIngredientes={hamburguesaIngredientes}
          carneCantidad={carneCantidad}
          quesoCantidad={quesoCantidad}
          precioTotal={precioTotal}
          caloriasTotal={caloriasTotal}
          shouldShowImage={shouldShowImage}
          handleImageError={handleImageError}
        />
      </main>
    </div>
  );
} 