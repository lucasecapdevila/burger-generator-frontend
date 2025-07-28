'use client';

interface ProgressStepsProps {
  currentStep: 'pan' | 'carne' | 'queso' | 'vegetales' | 'salsas' | 'otros' | 'extras' | 'bebidas';
  hasPan: boolean;
  hasCarne: boolean;
  hasQueso: boolean;
  hasVegetales: boolean;
  hasSalsas: boolean;
  hasOtros: boolean;
  hasExtras: boolean;
  hasBebidas: boolean;
  onStepClick?: (step: 'pan' | 'carne' | 'queso' | 'vegetales' | 'salsas' | 'otros' | 'extras' | 'bebidas') => void;
}

export default function ProgressSteps({
  currentStep,
  hasPan,
  hasCarne,
  hasQueso,
  hasVegetales,
  hasSalsas,
  hasOtros,
  hasExtras,
  hasBebidas,
  onStepClick
}: ProgressStepsProps) {
  const handleStepClick = (step: 'pan' | 'carne' | 'queso' | 'vegetales' | 'salsas' | 'otros' | 'extras' | 'bebidas') => {
    if (onStepClick) {
      onStepClick(step);
    }
  };

  const isStepClickable = (step: 'pan' | 'carne' | 'queso' | 'vegetales' | 'salsas' | 'otros' | 'extras' | 'bebidas') => {
    switch (step) {
      case 'pan':
        return hasPan;
      case 'carne':
        return hasCarne;
      case 'queso':
        return hasQueso;
      case 'vegetales':
        return hasVegetales;
      case 'salsas':
        return hasSalsas;
      case 'otros':
        return hasOtros;
      case 'extras':
        return hasExtras;
      case 'bebidas':
        return hasBebidas;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="flex items-center justify-center space-x-1 md:space-x-2 flex-wrap">
        <div 
          className={`flex items-center ${currentStep === 'pan' || hasPan ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('pan') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('pan') && handleStepClick('pan')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasPan ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'pan' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasPan ? '✓' : '1'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Pan</span>
        </div>
        
        <div className={`w-8 h-0.5 ${hasPan ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        
        <div 
          className={`flex items-center ${currentStep === 'carne' || hasCarne ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('carne') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('carne') && handleStepClick('carne')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasCarne ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'carne' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasCarne ? '✓' : '2'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Carne</span>
        </div>

        <div className={`w-8 h-0.5 ${hasCarne ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        
        <div 
          className={`flex items-center ${currentStep === 'queso' || hasQueso ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('queso') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('queso') && handleStepClick('queso')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasQueso ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'queso' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasQueso ? '✓' : '3'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Queso</span>
        </div>

        <div className={`w-8 h-0.5 ${hasQueso ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        
        <div 
          className={`flex items-center ${currentStep === 'vegetales' || hasVegetales ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('vegetales') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('vegetales') && handleStepClick('vegetales')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasVegetales ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'vegetales' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasVegetales ? '✓' : '4'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Vegetales</span>
        </div>

        <div className={`w-8 h-0.5 ${hasVegetales ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        
        <div 
          className={`flex items-center ${currentStep === 'salsas' || hasSalsas ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('salsas') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('salsas') && handleStepClick('salsas')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasSalsas ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'salsas' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasSalsas ? '✓' : '5'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Salsas</span>
        </div>

        <div className={`w-8 h-0.5 ${hasSalsas ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        
        <div 
          className={`flex items-center ${currentStep === 'otros' || hasOtros ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('otros') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('otros') && handleStepClick('otros')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasOtros ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'otros' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasOtros ? '✓' : '6'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Otros</span>
        </div>

        <div className={`w-8 h-0.5 ${hasOtros ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        
        <div 
          className={`flex items-center ${currentStep === 'extras' || hasExtras ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('extras') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('extras') && handleStepClick('extras')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasExtras ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'extras' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasExtras ? '✓' : '7'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Extras</span>
        </div>

        <div className={`w-8 h-0.5 ${hasExtras ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        
        <div 
          className={`flex items-center ${currentStep === 'bebidas' || hasBebidas ? 'text-orange-600' : 'text-gray-400'} ${
            isStepClickable('bebidas') ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={() => isStepClickable('bebidas') && handleStepClick('bebidas')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            hasBebidas ? 'bg-orange-600 border-orange-600 text-white' : 
            currentStep === 'bebidas' ? 'border-orange-600 text-orange-600' : 'border-gray-300 text-gray-400'
          }`}>
            {hasBebidas ? '✓' : '8'}
          </div>
          <span className="ml-2 text-xs md:text-sm font-medium hidden sm:inline">Bebidas</span>
        </div>
      </div>
    </div>
  );
} 