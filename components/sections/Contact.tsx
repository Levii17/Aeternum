'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useInView } from '@/hooks/useInView'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
  projectType: z.enum(['web', 'system', 'both', 'consultation'] as const, {
    message: 'Please select a project type',
  }),
  budget: z.enum(['3-5k', '5-20k', '20-50k', '50k+', ''] as const).optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

const projectTypes = [
  { value: 'web', label: 'Web Design' },
  { value: 'system', label: 'System Architecture' },
  { value: 'both', label: 'Full Stack (Web + System)' },
  { value: 'consultation', label: 'Consultation' },
]

const budgetRanges = [
  { value: '3-5k', label: 'R3K - R5K' },
  { value: '5-20k', label: 'R5K - R20K' },
  { value: '20-50k', label: 'R20K - R50K' },
  { value: '50k+', label: 'R50K+' },
]

import { Section } from '@/components/shared/Section'

// ... (imports and schema definition remain the same)

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [ref, inView] = useInView({ threshold: 0.1 })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: undefined,
      budget: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Message sent successfully!')
        reset()
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="contact" className="bg-stone-100 dark:bg-stone-950">
      <div className="section-title">
        <span className="roman-number">V • CONTACT</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl"
        >
          Start Your Project
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lead max-w-3xl mx-auto"
        >
          Let&apos;s build something remarkable together. Fill out the form below or email us directly at{' '}
          <a 
            href="mailto:A3ternum@proton.me" 
            className="text-bronze-500 hover:text-bronze-600 transition-colors"
          >
            A3ternum@proton.me
            
          </a>
        </motion.p>
      </div>

      <div ref={ref} className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Form fields... */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" {...register('name')} className={cn('form-input', { 'border-red-500': errors.name })} />
              {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" {...register('email')} className={cn('form-input', { 'border-red-500': errors.email })} />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="company" className="form-label">Company (Optional)</label>
            <input type="text" id="company" {...register('company')} className="form-input" />
          </div>
          <div>
            <label htmlFor="projectType" className="form-label">Project Type</label>
            <select id="projectType" {...register('projectType')} className={cn('form-input', { 'border-red-500': errors.projectType })}>
              <option value="">Select a project type...</option>
              {projectTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
            </select>
            {errors.projectType && <p className="form-error">{errors.projectType.message}</p>}
          </div>
          <div>
            <label className="form-label">Budget (Optional)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {budgetRanges.map(range => (
                <label key={range.value} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:border-bronze-500">
                  <input type="radio" {...register('budget')} value={range.value} className="form-radio" />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="form-label">Message</label>
            <textarea id="message" rows={5} {...register('message')} className={cn('form-input', { 'border-red-500': errors.message })} />
            {errors.message && <p className="form-error">{errors.message.message}</p>}
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full md:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send className="w-5 h-5 ml-2" />
            </button>
          </div>
        </motion.form>

        {/* Submission Status */}
        {submitStatus !== 'idle' && (
          <div className="mt-6 text-center">
            {submitStatus === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-emerald-500">
                <CheckCircle className="w-5 h-5" />
                <span>{submitMessage}</span>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span>{submitMessage}</span>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}