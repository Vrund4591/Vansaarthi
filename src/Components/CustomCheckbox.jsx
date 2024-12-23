import React from 'react';
import { Check } from 'lucide-react';

const CustomCheckbox = ({ label, checked, onChange, disabled = false }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <div 
        className={`
          w-5 h-5 flex items-center justify-center
          rounded border transition-all duration-200
          ${checked 
            ? 'bg-green-500 border-green-500' 
            : 'bg-white border-gray-300'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-green-500'
          }
        `}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) {
            onChange(!checked);
          }
        }}
      >
        {checked && (
          <Check 
            size={14} 
            className="text-white stroke-2"
          />
        )}
      </div>
      <span className={`
        text-md
        ${disabled ? 'text-black' : 'text-black'}
      `}>
        {label}
      </span>
    </label>
  );
};

export default CustomCheckbox;