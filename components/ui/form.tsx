'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

// Form Context
interface FormContextValue {
  disabled?: boolean
  loading?: boolean
}

const FormContext = React.createContext<FormContextValue>({})

const useFormContext = () => React.useContext(FormContext)

interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  disabled?: boolean
  loading?: boolean
  onFormSubmit?: (data: FormData) => void | Promise<void>
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, disabled, loading, onFormSubmit, children, ...props }, ref) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (disabled || loading) return;
      const formData = new FormData(event.currentTarget);
      if (onFormSubmit) {
        await onFormSubmit(formData);
      }
    };
    return (
      <FormContext.Provider value={{ disabled, loading }}>
        <form
          ref={ref}
          className={cn('space-y-6', className)}
          onSubmit={handleSubmit}
          noValidate
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);
Form.displayName = 'Form'

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  columns?: 1 | 2 | 3
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, children, columns = 1, spacing = 'md', ...props }, ref) => {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    }[columns]

    const gap = {
      none: 'gap-0',
      sm: 'gap-3',
      md: 'gap-6',
      lg: 'gap-8',
    }[spacing]

    return (
      <div
        ref={ref}
        className={cn('grid', gridCols, gap, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormGroup.displayName = 'FormGroup'

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  required?: boolean
  error?: string
  success?: string
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, children, required, error, success, ...props }, ref) => {
    const { disabled } = useFormContext()

    return (
      <div
        ref={ref}
        className={cn('space-y-2', disabled && 'opacity-60', className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              required,
              error: !!error,
              success: !!success,
              disabled,
            } as Partial<typeof child.props>);
          }
          return child;
        })}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{success}</span>
          </motion.div>
        )}
      </div>
    )
  }
)
FormItem.displayName = 'FormItem'

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  optional?: boolean
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, optional, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2',
          'flex items-center justify-between',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {optional && (
          <span className="text-xs text-stone-500 font-normal">
            Optional
          </span>
        )}
      </label>
    )
  }
)
FormLabel.displayName = 'FormLabel'

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
      </div>
    )
  }
)
FormControl.displayName = 'FormControl'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, error, success, icon, iconPosition = 'left', disabled, ...props }, ref) => {
    const { disabled: formDisabled } = useFormContext()
    const isDisabled = disabled || formDisabled

    return (
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500">
            {icon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-lg border px-3 py-2 text-sm',
            'bg-white dark:bg-stone-900',
            'border-stone-300 dark:border-stone-700',
            'placeholder:text-stone-500',
            'focus:outline-none focus:ring-2 focus:ring-bronze-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-rose-500 focus:ring-rose-500',
            success && 'border-emerald-500 focus:ring-emerald-500',
            icon && iconPosition === 'left' && 'pl-10',
            icon && iconPosition === 'right' && 'pr-10',
            className
          )}
          ref={ref}
          disabled={isDisabled}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500">
            {icon}
          </div>
        )}
      </div>
    )
  }
)
FormInput.displayName = 'FormInput'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  success?: boolean
  resize?: boolean
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, error, success, resize = true, disabled, ...props }, ref) => {
    const { disabled: formDisabled } = useFormContext()
    const isDisabled = disabled || formDisabled

    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border px-3 py-2 text-sm',
          'bg-white dark:bg-stone-900',
          'border-stone-300 dark:border-stone-700',
          'placeholder:text-stone-500',
          'focus:outline-none focus:ring-2 focus:ring-bronze-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !resize && 'resize-none',
          error && 'border-rose-500 focus:ring-rose-500',
          success && 'border-emerald-500 focus:ring-emerald-500',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      />
    )
  }
)
FormTextarea.displayName = 'FormTextarea'

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  success?: boolean
  options: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  placeholder?: string
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, error, success, options, placeholder, disabled, ...props }, ref) => {
    const { disabled: formDisabled } = useFormContext()
    const isDisabled = disabled || formDisabled

    return (
      <select
        className={cn(
          'flex h-12 w-full rounded-lg border px-3 py-2 text-sm',
          'bg-white dark:bg-stone-900',
          'border-stone-300 dark:border-stone-700',
          'focus:outline-none focus:ring-2 focus:ring-bronze-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'appearance-none',
          error && 'border-rose-500 focus:ring-rose-500',
          success && 'border-emerald-500 focus:ring-emerald-500',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)
FormSelect.displayName = 'FormSelect'

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
  label?: string
}

const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, error, success, label, disabled, ...props }, ref) => {
    const { disabled: formDisabled } = useFormContext()
    const isDisabled = disabled || formDisabled

    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          className={cn(
            'h-5 w-5 rounded border-stone-300 dark:border-stone-700',
            'text-bronze-500 focus:ring-bronze-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-rose-500 text-rose-500',
            success && 'border-emerald-500 text-emerald-500',
            className
          )}
          ref={ref}
          disabled={isDisabled}
          {...props}
        />
        {label && (
          <span className="text-sm text-stone-700 dark:text-stone-300">
            {label}
          </span>
        )}
      </label>
    )
  }
)
FormCheckbox.displayName = 'FormCheckbox'

interface FormRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
  label: string
}

const FormRadio = React.forwardRef<HTMLInputElement, FormRadioProps>(
  ({ className, error, success, label, disabled, ...props }, ref) => {
    const { disabled: formDisabled } = useFormContext()
    const isDisabled = disabled || formDisabled

    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          className={cn(
            'h-5 w-5 border-stone-300 dark:border-stone-700',
            'text-bronze-500 focus:ring-bronze-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-rose-500 text-rose-500',
            success && 'border-emerald-500 text-emerald-500',
            className
          )}
          ref={ref}
          disabled={isDisabled}
          {...props}
        />
        <span className="text-sm text-stone-700 dark:text-stone-300">
          {label}
        </span>
      </label>
    )
  }
)
FormRadio.displayName = 'FormRadio'

interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loadingText?: string
}

const FormSubmitButton = React.forwardRef<HTMLButtonElement, FormSubmitButtonProps>(
  ({ className, children, loadingText = 'Submitting...', disabled }, ref) => {
    const { disabled: formDisabled, loading } = useFormContext()
    const isDisabled = disabled || formDisabled || loading

    return (
      <motion.button
        type="submit"
        className={cn(
          'inline-flex items-center justify-center gap-3',
          'px-8 py-3 rounded-lg font-medium transition-all duration-300',
          'bg-bronze-500 text-white',
          'hover:bg-bronze-600',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
FormSubmitButton.displayName = 'FormSubmitButton'

interface FormSuccessMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  icon?: React.ReactNode
}

const FormSuccessMessage = React.forwardRef<HTMLDivElement, FormSuccessMessageProps>(
  ({ className, message, icon = <CheckCircle className="w-5 h-5" /> }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20',
          'flex items-center gap-3',
          className
        )}
      >
        {icon}
        <span className="text-emerald-700 dark:text-emerald-400">{message}</span>
      </motion.div>
    )
  }
)
FormSuccessMessage.displayName = 'FormSuccessMessage'

interface FormErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  icon?: React.ReactNode
}

const FormErrorMessage = React.forwardRef<HTMLDivElement, FormErrorMessageProps>(
  ({ className, message, icon = <AlertCircle className="w-5 h-5" /> }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'p-4 rounded-lg bg-rose-500/10 border border-rose-500/20',
          'flex items-center gap-3',
          className
        )}
      >
        {icon}
        <span className="text-rose-700 dark:text-rose-400">{message}</span>
      </motion.div>
    )
  }
)
FormErrorMessage.displayName = 'FormErrorMessage'

// Form Field Wrapper
interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  success?: string
  children: React.ReactNode
  description?: string
  className?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, required, error, success, children, description, className }, ref) => {
    return (
      <FormItem
        ref={ref}
        className={className}
        required={required}
        error={error}
        success={success}
      >
        <FormLabel>
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </FormLabel>
        
        {description && (
          <p className="text-sm text-stone-500 mb-2">{description}</p>
        )}
        
        <FormControl>{children}</FormControl>
      </FormItem>
    )
  }
)
FormField.displayName = 'FormField'

export {
  Form,
  FormGroup,
  FormItem,
  FormLabel,
  FormControl,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormRadio,
  FormSubmitButton,
  FormSuccessMessage,
  FormErrorMessage,
  FormField,
}