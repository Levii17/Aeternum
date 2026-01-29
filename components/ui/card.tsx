import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean
  glass?: boolean
  gradient?: boolean
  border?: boolean
  animated?: boolean
};
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glass = false, gradient = false, border = true, animated = false, ...props }, ref) => {
    const baseClass = cn(
      'rounded-xl transition-all duration-500',
      border && 'border border-stone-200 dark:border-stone-800',
      glass && 'backdrop-blur-md bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10',
      gradient && 'bg-gradient-to-br from-stone-50 to-white dark:from-stone-900 dark:to-stone-950',
      !glass && !gradient && 'bg-white dark:bg-stone-900',
      hover && 'hover:shadow-xl hover:-translate-y-1',
      className
    );
    if (animated) {
      // Only pass className and animation props to motion.div
      return (
        <motion.div
          ref={ref}
          className={baseClass}
          whileHover={hover ? { y: -4 } : {}}
        >
          {props.children}
        </motion.div>
      );
    }
    return <div ref={ref} className={baseClass} {...props} />;
  }
);
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-serif text-2xl font-semibold tracking-wide', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-stone-600 dark:text-stone-400', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Specialized Card Components

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, title, value, description, icon, trend, trendValue, ...props }, ref) => (
  <Card ref={ref} className={cn('p-6', className)} {...props}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-stone-600 dark:text-stone-400">{title}</p>
          <p className="text-3xl font-serif font-bold mt-2">{value}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-bronze-500/10 text-bronze-500">
            {icon}
          </div>
        )}
      </div>
      {(description || trend) && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-200 dark:border-stone-800">
          {description && (
            <p className="text-sm text-stone-600 dark:text-stone-400">{description}</p>
          )}
          {trend && trendValue && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
              trend === 'down' ? 'text-rose-600 dark:text-rose-400' :
              'text-stone-600 dark:text-stone-400'
            )}>
              <span>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
              </span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      )}
  </Card>
  )
)
StatCard.displayName = 'StatCard'

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: React.ReactNode
  color?: 'bronze' | 'blue' | 'emerald' | 'purple' | 'amber'
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, title, description, icon, color = 'bronze', ...props }, ref) => {
    const colorClasses = {
      bronze: 'bg-bronze-500/10 text-bronze-500 border-bronze-500/20',
      blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    }

    return (
  <Card
        ref={ref}
        className={cn('p-6 group', className)}
        {...props}
      >
        <div className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
          colorClasses[color]
        )}>
          {icon}
        </div>
        <h3 className="font-serif text-xl mb-3">{title}</h3>
        <p className="text-stone-600 dark:text-stone-400">{description}</p>
        <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800 group-hover:border-bronze-500/50 transition-colors">
          <span className="text-sm text-bronze-500 font-medium group-hover:ml-2 transition-all duration-300">
            Learn more →
          </span>
        </div>
  </Card>
    )
  }
)
FeatureCard.displayName = 'FeatureCard'

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string
  author: string
  role: string
  company?: string
  avatar?: string
  rating?: number
}

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ className, quote, author, role, company, avatar, rating = 5, ...props }, ref) => (
  <Card ref={ref} className={cn('p-6 relative', className)} {...props}>
      {/* Quote marks */}
  <div className="absolute top-6 right-6 text-4xl text-bronze-500/20">&quot;</div>
      
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={cn(
              'w-4 h-4',
              i < rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300 dark:text-stone-700'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
  <p className="text-lg text-stone-700 dark:text-stone-300 mb-6 italic">&quot;{quote}&quot;</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {avatar ? (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bronze-500 to-bronze-300" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-bronze-500/10 flex items-center justify-center">
            <span className="text-bronze-500 font-serif font-bold">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-serif font-medium">{author}</h4>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {role}
            {company && ` • ${company}`}
          </p>
        </div>
      </div>
  </Card>
  )
)
TestimonialCard.displayName = 'TestimonialCard'

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string
  // alt: string // removed unused alt
  title: string
  description?: string
  overlay?: boolean
  aspect?: 'square' | 'video' | 'auto'
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({ className, image, title, description, overlay = true, aspect = 'video', ...props }, ref) => {
    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      auto: '',
    }

    return (
  <Card ref={ref} className={cn('overflow-hidden p-0', className)} {...props}>
        <div className={cn('relative', aspectClasses[aspect])}>
          {/* Image placeholder - in real project use next/image */}
          <div 
            className="w-full h-full bg-gradient-to-br from-bronze-500/20 to-stone-500/20"
            style={{ backgroundImage: `url(${image})` }}
          />
          
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-serif text-xl text-white mb-2">{title}</h3>
            {description && (
              <p className="text-sm text-white/80">{description}</p>
            )}
          </div>
        </div>
  </Card>
    )
  }
)
ImageCard.displayName = 'ImageCard'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  StatCard,
  FeatureCard,
  TestimonialCard,
  ImageCard,
}