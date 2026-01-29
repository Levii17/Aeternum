module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        bronze: {
          50: '#FAF8F5',
          100: '#F4F0E8',
          200: '#E8DCC9',
          300: '#DCC8A9',
          400: '#D0B48A',
          500: '#8C6A43', // Primary bronze
          600: '#765635',
          700: '#614228',
          800: '#4B2F1A',
          900: '#361B0D',
          950: '#2A1F0F',
        },
        
        stone: {
          50: '#F4F2EE',
          100: '#E6E1D6',
          150: '#DCD6C9',
          200: '#D2CEC4',
          400: '#B2B0AA',
          700: '#3A3A3A',
          900: '#1C1C1C',
        },
        
        amber: {
          500: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        'hero': ['3.5rem', {
          'lineHeight': '1.2',
          'letterSpacing': '-0.02em',
        }],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '8px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll': 'scroll 20s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, rgba(207, 202, 192, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(207, 202, 192, 0.3) 1px, transparent 1px)`,
        'bronze-gradient': 'linear-gradient(135deg, #8C6A43 0%, #D0B48A 100%)',
        'stone-gradient': 'linear-gradient(135deg, #F4F2EE 0%, #E6E1D6 100%)',
      },
    },
  },
  plugins: [],
}