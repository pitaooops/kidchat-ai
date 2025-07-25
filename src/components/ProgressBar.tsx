import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepLabels }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-white/30 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-kid-green to-kid-blue h-3 rounded-full progress-bar-fill relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-kid transition-all ${
                    isCompleted 
                      ? 'bg-kid-green text-white' 
                      : isActive 
                      ? 'bg-white text-kid-purple animate-pulse' 
                      : 'bg-white/50 text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`text-xs font-kid mt-2 text-center ${
                  isActive ? 'text-white font-bold' : 'text-white/70'
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;