'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300',
          scrolled
            ? 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/30 dark:border-stone-800/30 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-semibold tracking-[0.2em]">
              AETERNUM
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm tracking-[0.1em] relative py-2 group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-bronze-500 transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
              
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center transition-colors hover:border-bronze-500 hover:bg-bronze-500/10"
                aria-label="Toggle theme"
              >
                {mounted && (theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                ))}
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center relative z-50"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isOpen ? 'open' : 'closed'}
                variants={{
                  open: { rotate: 45, y: 5 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <Menu className={cn(
                  'w-6 h-6 transition-opacity',
                  isOpen ? 'opacity-0' : 'opacity-100'
                )} />
                <X className={cn(
                  'w-6 h-6 absolute top-2 left-2 transition-opacity',
                  isOpen ? 'opacity-100' : 'opacity-0'
                )} />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md" />
            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative z-10 h-full flex flex-col items-center justify-center"
            >
              <div className="space-y-8 text-center">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-serif tracking-widest block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + navItems.length * 0.05 }}
                >
                  <button
                    onClick={toggleDarkMode}
                    className="text-2xl font-serif tracking-widest py-2"
                  >
                    {mounted && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
                  </button>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}