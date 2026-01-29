import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
  projectType: z.enum(['web', 'system', 'both', 'consultation'], {
    message: 'Please select a project type',
  }),
  budget: z.enum(['10-25k', '25-50k', '50-100k', '100k+']).optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
})

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5

const requestStore = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW
  
  // Clean old requests
  const requests = (requestStore.get(ip) || []).filter(time => time > windowStart)
  
  if (requests.length >= MAX_REQUESTS) {
    return true
  }
  
  requests.push(now)
  requestStore.set(ip, requests)
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // Validate with Zod
    const validatedData = contactSchema.parse(body)
    
    // TODO:
    // 1. Send email using Resend/.
    // 2. Save to database
    // 3. Send notification to Discord
    
    // Simulate sending email (replace with actual email service)
    console.log('Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip,
    })
    
    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        data: {
          ...validatedData,
          id: `contact_${Date.now()}`,
          submittedAt: new Date().toISOString(),
        }
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// Add CORS headers for OPTIONS requests (if needed)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}