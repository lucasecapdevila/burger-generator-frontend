'use client';

import Link from 'next/link';
import { StepType } from '@/types';

interface NavigationButtonsProps {
  currentStep: StepType;
  hasRequiredIngredients: boolean;
  onBack: () => void;
  onContinue: () => void;
  onFinishOrder: () => void;
}

export default function NavigationButtons({
  currentStep,
  hasRequiredIngredients,
  onBack,
  onContinue,
  onFinishOrder,
}: NavigationButtonsProps) {
  const isLastStep = currentStep === 'bebidas';
  const isFirstStep = currentStep === 'pan';

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      {/* Back to home button */}
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al Inicio
      </Link>
      
      {/* Back button */}
      {!isFirstStep && (
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
      )}

      {/* Continue/Finish button */}
      {!isLastStep && hasRequiredIngredients && (
        <button
          onClick={onContinue}
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Continuar
        </button>
      )}
      
      {/* Finish order button - only show on last step */}
      {isLastStep && hasRequiredIngredients && (
        <button
          onClick={onFinishOrder}
          className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Finalizar Pedido
        </button>
      )}
    </div>
  );
} 