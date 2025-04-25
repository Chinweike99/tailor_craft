import React, { forwardRef, useState, useRef, useEffect } from "react";
import { FieldError } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: FieldError;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ 
    label, 
    options, 
    value, 
    onChange, 
    error, 
    helperText, 
    size = "md", 
    required, 
    disabled,
    id,
    name,
    className,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(
      value ? options.find(option => option.value === value) || null : null
    );
    const selectRef = useRef<HTMLDivElement>(null);
    
    // Combine refs
    const combinedRef = (element: HTMLDivElement) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
      selectRef.current = element;
    };

    const sizeClasses = {
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-4",
      lg: "py-3 px-5 text-lg",
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Update selected option when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedOption(options.find(option => option.value === value) || null);
      }
    }, [value, options]);

    const handleSelectOption = (option: Option) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) {
        onChange(option.value);
      }
    };

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div className="mb-4 relative px-4 md:px-0" {...props}>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div 
          ref={combinedRef}
          className="relative w-full"
        >
          {/* Custom select trigger */}
          <div
            id={id}
            onClick={toggleDropdown}
            className={`
              w-full border rounded-md cursor-pointer flex justify-between items-center
              bg-white dark:bg-gray-800 dark:text-white 
              ${sizeClasses[size]}
              transition-all duration-200
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 hover:border-primary"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${className || ""}
            `}
          >
            <span className={selectedOption ? "" : "text-gray-500"}>
              {selectedOption ? selectedOption.label : "Select an option"}
            </span>
            
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none flex items-center text-gray-700 dark:text-gray-300">
              <svg 
                className={`fill-current h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Dropdown options */}
          {isOpen && (
            <div 
              className="
                absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 
                border border-gray-300 dark:border-gray-600 rounded-md shadow-lg
                overflow-hidden max-h-60 overflow-y-auto
              "
            >
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelectOption(option)}
                    className={`
                      px-4 py-2 cursor-pointer text-gray-800 dark:text-white
                      ${selectedOption?.value === option.value ? 'bg-primary bg-opacity-20' : ''}
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      transition-colors duration-150
                      overflow-hidden text-ellipsis whitespace-nowrap
                    `}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  No options available
                </div>
              )}
            </div>
          )}

          {/* Hidden input for form submission */}
          <input 
            type="hidden" 
            name={name} 
            value={selectedOption?.value || ''} 
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;