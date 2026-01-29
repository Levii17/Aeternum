import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm font-sans font-medium tracking-wider transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-bronze-500 text-stone-50 border border-bronze-500 hover:bg-bronze-600 hover:border-bronze-600',
        destructive:
          'bg-rose-500 text-white border border-rose-500 hover:bg-rose-600 hover:border-rose-600',
        outline:
          'bg-transparent text-bronze-500 border border-bronze-500 hover:bg-bronze-500 hover:text-stone-50',
        secondary:
          'bg-stone-200 text-stone-900 border border-stone-300 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:border-stone-700 dark:hover:bg-stone-700',
        ghost:
          'bg-transparent text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 border border-transparent',
        link: 'text-bronze-500 underline-offset-4 hover:underline bg-transparent',
        gradient:
          'bg-gradient-to-r from-bronze-500 to-bronze-300 text-white border-0 hover:shadow-lg hover:shadow-bronze-500/25',
        glass:
          'backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 text-white hover:bg-white/20 dark:hover:bg-black/20',
      },
      size: {
        default: 'px-8 py-4 text-base gap-3',
        sm: 'px-6 py-3 text-sm gap-2',
        lg: 'px-12 py-6 text-lg gap-4',
        xl: 'px-16 py-8 text-xl gap-4',
        icon: 'h-10 w-10',
      },
      animation: {
        none: '',
        scale: 'hover:scale-105 active:scale-95',
        lift: 'hover:-translate-y-1 active:translate-y-0',
        magnetic: 'hover:scale-105 active:scale-95',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'scale',
      fullWidth: false,
    },
  }
)

// Magnetic effect component
const MagneticButton = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'> & {
    asChild?: boolean
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    animation?: VariantProps<typeof buttonVariants>['animation']
    fullWidth?: boolean
  }
>(({
  className, variant, size, animation, fullWidth, asChild = false, ...props
}, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Comp = asChild ? Slot : motion.button

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, animation, fullWidth, className }))}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: animation === 'magnetic'
          ? `translate(${position.x * 10}px, ${position.y * 10}px)`
          : undefined,
      }}
      // Only spread props that are valid for a button
      {...Object.fromEntries(Object.entries(props).filter(([k]) => k !== 'onDrag'))}
    />
  )
})
MagneticButton.displayName = 'MagneticButton'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  pulse?: boolean
  glow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      fullWidth,
      asChild = false,
      children,
      icon,
      iconPosition = 'right',
      loading = false,
      pulse = false,
      glow = false,
      disabled,
      ...props
    },
    ref
  ) => {
  const Comp = (animation === 'magnetic' ? MagneticButton : asChild ? Slot : motion.button) as React.ElementType

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, animation, fullWidth }),
          pulse && 'animate-pulse',
          glow && 'shadow-lg shadow-bronze-500/25',
          loading && 'cursor-wait',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        whileHover={animation === 'none' ? {} : { scale: 1.05 }}
        whileTap={animation === 'none' ? {} : { scale: 0.95 }}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {/* Hover effect overlay */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-bronze-500 to-bronze-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Loading spinner */}
        {loading && (
          <span className="mr-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}

        {/* Icon left */}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2 group-hover:translate-x-1 transition-transform">
            {icon}
          </span>
        )}

        {/* Children */}
        <span className="relative z-10">{children}</span>

        {/* Icon right */}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            {icon}
          </span>
        )}

        {/* Ripple effect */}
        {!asChild && (
          <span className="absolute inset-0 overflow-hidden -z-10">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </span>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

// Icon Button variant
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode
  label: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, className, variant = 'ghost', size = 'icon', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn('rounded-full', className)}
        variant={variant}
        size={size}
        aria-label={label}
        {...props}
      >
        {icon}
      </Button>
    )
  }
)
IconButton.displayName = 'IconButton'

// Button Group
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = 'horizontal', spacing = 'md', ...props }, ref) => {
    const spacingClass = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    }[spacing]

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          spacingClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'

export { Button, IconButton, ButtonGroup, buttonVariants }