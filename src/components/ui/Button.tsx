// button componet
'use client';
import React from "react";
import {HTMLMotionProps, motion} from 'framer-motion'
import { cn } from "@/lib/utils";

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * “Create a new interface called ButtonProps that inherits all the built-in 
 * props of a standard <button> element in React (like onClick, disabled, type, etc.).
 */
// Define conflicting event handlers

type MotionDragHandlers = 
  'onDrag' | 
  'onDragStart' |
  'onDragEnd' | 
  'onDragEnter' | 
  'onDragLeave' | 
  'onDragOver' | 
  'onDrop';


type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, MotionDragHandlers> & 
  Omit<HTMLMotionProps<"button">, "ref"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    children: React.ReactNode;
  };


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, 
        fullWidth = false, className, children, whileHover = {scale: 1.03},
        whileTap = {scale: 0.97}, ...props
    }, ref) =>{
        // Base button styles
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    // Variant styles
    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      outline: "border border-input bg-background hover:bg-accent bg-green-800 hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    // Size styles
    const sizeStyles = {
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-10 rounded-md px-4 py-2',
        lg: 'h-12 rounded-lg px-6 py-3 text-lg',
        xl: 'h-14 rounded-md px-8 py-4 text-xl',
    }
    
    return (
        <motion.button
        ref={ref}
        className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            fullWidth ? "w-full" : "",
            className
        )}
        whileHover={whileHover}
        whileTap={whileTap}
        disabled = {isLoading || props.disabled}
        {...props}
        >
             {isLoading && (
    <span className="mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  )}

  {leftIcon && <span className="mr-2">{leftIcon}</span>}
  {children}
  {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </motion.button>
    )

    }
)

Button.displayName = "Button";