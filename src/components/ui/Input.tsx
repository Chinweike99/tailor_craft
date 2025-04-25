import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string | number;
    error?: FieldError;
    helperText?: string;
}


const Input = forwardRef<HTMLInputElement, InputProps>((
  {label, error, helperText, className, ...props}, ref) => {

    return(
      <div className="mb-4">
        <label htmlFor={props.id}>
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>

        <input 
        ref={ref}
        {...props}
        className={`w-full px-4 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 *:
          ${error
            ? 'border-red-600 focus:ring-red-600'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white'
          }
          ${className || ""}
          `}
        />
        {error && (
          <p className="bg-red-600 text-sm mt-1">{error.message}</p>
        )}

        {helperText && !error && (
           <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{helperText}</p>
        )}

      </div>
    )
  })

  Input.displayName = 'Input';

export default Input
