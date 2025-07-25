import React, { useState } from 'react';
import { ArrowRight, Shield, Eye, EyeOff } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface PinSetupProps {
  onComplete: (pin: string) => void;
}

const PinSetup: React.FC<PinSetupProps> = ({ onComplete }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handlePinChange = (index: number, value: string, isConfirm = false) => {
    if (!/^\d*$/.test(value)) return; // Only digits
    
    const newPin = isConfirm ? [...confirmPin] : [...pin];
    newPin[index] = value.slice(-1); // Only last digit
    
    if (isConfirm) {
      setConfirmPin(newPin);
    } else {
      setPin(newPin);
    }
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(
        isConfirm ? `confirm-pin-${index + 1}` : `pin-${index + 1}`
      );
      nextInput?.focus();
    }
    
    setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent, isConfirm = false) => {
    if (e.key === 'Backspace' && index > 0) {
      const currentPin = isConfirm ? confirmPin : pin;
      if (!currentPin[index]) {
        const prevInput = document.getElementById(
          isConfirm ? `confirm-pin-${index - 1}` : `pin-${index - 1}`
        );
        prevInput?.focus();
      }
    }
  };

  const handleCreatePin = () => {
    const pinValue = pin.join('');
    if (pinValue.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }
    setStep('confirm');
  };

  const handleConfirmPin = () => {
    const pinValue = pin.join('');
    const confirmValue = confirmPin.join('');
    
    if (confirmValue.length !== 4) {
      setError('Please confirm your 4-digit PIN');
      return;
    }
    
    if (pinValue !== confirmValue) {
      setError('PINs do not match. Please try again.');
      setConfirmPin(['', '', '', '']);
      return;
    }
    
    onComplete(pinValue);
  };

  const resetToCreate = () => {
    setStep('create');
    setPin(['', '', '', '']);
    setConfirmPin(['', '', '', '']);
    setError('');
  };

  const currentPin = step === 'create' ? pin : confirmPin;
  const isComplete = currentPin.every(digit => digit !== '');

  return (
    <div className="tablet-container h-screen bg-gradient-to-br from-kid-sunshine via-kid-coral to-kid-mint flex flex-col items-center justify-center p-8">
      {/* Progress Bar */}
      <ProgressBar 
        currentStep={3} 
        totalSteps={3} 
        stepLabels={['Create Profile', 'Confirm Details', 'Setup PIN']} 
      />
      
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl w-full shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-kid-purple mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 font-kid mb-2">
            {step === 'create' ? 'Set Parent PIN' : 'Confirm PIN'}
          </h1>
          <p className="text-gray-600 font-kid">
            {step === 'create' 
              ? 'Create a 4-digit PIN for parent access 🔒'
              : 'Please enter your PIN again to confirm ✅'
            }
          </p>
        </div>

        {/* PIN Input */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-4">
            {currentPin.map((digit, index) => (
              <input
                key={index}
                id={step === 'create' ? `pin-${index}` : `confirm-pin-${index}`}
                type={showPin ? 'text' : 'password'}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value, step === 'confirm')}
                onKeyDown={(e) => handleKeyDown(index, e, step === 'confirm')}
                className="w-16 h-16 text-center text-2xl font-bold border-2 border-kid-purple/30 rounded-xl focus:border-kid-purple focus:outline-none bg-white"
                maxLength={1}
                autoComplete="off"
              />
            ))}
          </div>
          
          {/* Show/Hide PIN */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors font-kid"
            >
              {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
              <span className="ml-2 text-sm">
                {showPin ? 'Hide' : 'Show'} PIN
              </span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
            <p className="text-red-600 text-center font-kid text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {step === 'create' ? (
            <button
              onClick={handleCreatePin}
              disabled={!isComplete}
              className="w-full bg-kid-purple text-white p-4 rounded-2xl font-bold text-lg font-kid kid-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Continue
              <ArrowRight className="ml-2" size={20} />
            </button>
          ) : (
            <>
              <button
                onClick={handleConfirmPin}
                disabled={!isComplete}
                className="w-full bg-kid-green text-white p-4 rounded-2xl font-bold text-lg font-kid kid-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Complete Setup
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button
                onClick={resetToCreate}
                className="w-full bg-gray-200 text-gray-700 p-3 rounded-2xl font-bold font-kid kid-button"
              >
                Back to Create PIN
              </button>
            </>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-kid-blue/10 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-kid-blue mt-0.5" />
            <div>
              <h4 className="font-bold font-kid text-gray-700 text-sm mb-1">
                Why do we need a PIN?
              </h4>
              <p className="text-xs font-kid text-gray-600">
                This PIN keeps your child safe by allowing only parents to access settings, 
                view detailed analytics, and manage the account. 🛡️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinSetup;