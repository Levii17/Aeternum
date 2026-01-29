'use client'

import { useState, useEffect, RefObject } from 'react'

interface MousePosition {
  x: number
  y: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  screenX: number
  screenY: number
  movementX: number
  movementY: number
  isMoving: boolean
  isDown: boolean
  clicked: boolean
  target: EventTarget | null
}

interface UseMousePositionOptions {
  includeMovement?: boolean
  includeClick?: boolean
  includeTarget?: boolean
  throttleMs?: number
  resetOnLeave?: boolean
  boundingRef?: RefObject<HTMLElement>
}

export function useMousePosition(options: UseMousePositionOptions = {}) {
  const {
    includeMovement = true,
    includeClick = true,
    includeTarget = false,
    throttleMs = 16, // ~60fps
    resetOnLeave = false,
    boundingRef,
  } = options

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
    movementX: 0,
    movementY: 0,
    isMoving: false,
    isDown: false,
    clicked: false,
    target: null,
  })

  const [lastUpdate, setLastUpdate] = useState(0)

  useEffect(() => {
    let isMounted = true
    let animationFrameId: number
    let lastX = 0
    let lastY = 0
    let isMoving = false
    let moveTimeout: NodeJS.Timeout

    const updatePosition = (event: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < throttleMs) return

      setLastUpdate(now)

      const {
        clientX,
        clientY,
        pageX,
        pageY,
        screenX,
        screenY,
        movementX = 0,
        movementY = 0,
        target,
      } = event

      // Calculate relative position if boundingRef is provided
      let x = clientX
      let y = clientY

      if (boundingRef?.current) {
        const rect = boundingRef.current.getBoundingClientRect()
        x = clientX - rect.left
        y = clientY - rect.top
      }

      // Calculate movement
      const deltaX = x - lastX
      const deltaY = y - lastY
      lastX = x
      lastY = y

      isMoving = Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5

      // Clear previous timeout
      if (moveTimeout) clearTimeout(moveTimeout)

      // Set timeout to reset isMoving
      moveTimeout = setTimeout(() => {
        if (isMounted) {
          setPosition(prev => ({
            ...prev,
            isMoving: false,
          }))
        }
      }, 50)

      if (isMounted) {
        setPosition({
          x,
          y,
          clientX,
          clientY,
          pageX,
          pageY,
          screenX,
          screenY,
          movementX: includeMovement ? movementX : deltaX,
          movementY: includeMovement ? movementY : deltaY,
          isMoving,
          isDown: position.isDown,
          clicked: false,
          target: includeTarget ? target : null,
        })
      }
    }

  const handleMouseDown = () => {
      if (isMounted) {
        setPosition(prev => ({
          ...prev,
          isDown: true,
          clicked: false,
        }))
      }
    }

  const handleMouseUp = () => {
      if (isMounted) {
        setPosition(prev => ({
          ...prev,
          isDown: false,
          clicked: true,
        }))

        // Reset clicked after short delay
        setTimeout(() => {
          if (isMounted) {
            setPosition(prev => ({
              ...prev,
              clicked: false,
            }))
          }
        }, 100)
      }
    }

    const handleMouseLeave = () => {
      if (resetOnLeave && isMounted) {
        setPosition({
          x: 0,
          y: 0,
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          screenX: 0,
          screenY: 0,
          movementX: 0,
          movementY: 0,
          isMoving: false,
          isDown: false,
          clicked: false,
          target: null,
        })
      }
    }

    const handleMouseEnter = () => {
      lastX = 0
      lastY = 0
    }

    // Throttled animation frame handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMounted) return

      animationFrameId = requestAnimationFrame(() => {
        updatePosition(event)
      })
    }

    // Add event listeners
    const element = boundingRef?.current || document

    if (includeClick) {
      element.addEventListener('mousedown', handleMouseDown as EventListener)
      element.addEventListener('mouseup', handleMouseUp as EventListener)
    }

    element.addEventListener('mousemove', handleMouseMove as EventListener)
    element.addEventListener('mouseleave', handleMouseLeave as EventListener)
    element.addEventListener('mouseenter', handleMouseEnter as EventListener)

    // Cleanup
    return () => {
      isMounted = false
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (moveTimeout) clearTimeout(moveTimeout)

      element.removeEventListener('mousemove', handleMouseMove as EventListener)
      element.removeEventListener('mouseleave', handleMouseLeave as EventListener)
      element.removeEventListener('mouseenter', handleMouseEnter as EventListener)

      if (includeClick) {
        element.removeEventListener('mousedown', handleMouseDown as EventListener)
        element.removeEventListener('mouseup', handleMouseUp as EventListener)
      }
    }
  }, [
    boundingRef,
    includeMovement,
    includeClick,
    includeTarget,
    throttleMs,
    resetOnLeave,
    lastUpdate,
    position.isDown,
  ])

  // Calculate derived values in a memoized way to avoid accessing refs during render
  // Derived values state
  const [derived, setDerived] = useState({
    velocity: 0,
    normalizedX: 0,
    normalizedY: 0,
    distanceFromCenter: 0,
    angleFromCenter: 0,
    isInsideBounds: true,
  });

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (boundingRef?.current) {
      width = boundingRef.current.clientWidth;
      height = boundingRef.current.clientHeight;
    }
    const velocity = Math.sqrt(position.movementX ** 2 + position.movementY ** 2);
    const normalizedX = boundingRef?.current
      ? position.x / width
      : position.clientX / window.innerWidth;
    const normalizedY = boundingRef?.current
      ? position.y / height
      : position.clientY / window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const distanceFromCenter = Math.sqrt(
      (position.clientX - centerX) ** 2 + (position.clientY - centerY) ** 2
    );
    const angleFromCenter = Math.atan2(
      position.clientY - centerY,
      position.clientX - centerX
    );
    const isInsideBounds = boundingRef?.current
      ? position.x >= 0 &&
        position.x <= width &&
        position.y >= 0 &&
        position.y <= height
      : true;
    setDerived({
      velocity,
      normalizedX,
      normalizedY,
      distanceFromCenter,
      angleFromCenter,
      isInsideBounds,
    });
    // Only update when position or boundingRef changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, boundingRef?.current]);

  return {
    ...position,
    ...derived,
  };
}

// Hook for tracking mouse position relative to multiple elements
// NOTE: useMousePositions cannot be implemented as a hook that calls useMousePosition in a loop.
// Instead, call useMousePosition separately for each ref in your component.

// Hook for mouse enter/leave detection
export function useMouseHover<T extends HTMLElement>(
  ref: RefObject<T>,
  options: {
    onEnter?: () => void
    onLeave?: () => void
    enabled?: boolean
  } = {}
) {
  const { onEnter, onLeave, enabled = true } = options
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!enabled || !ref.current) return

    const element = ref.current

    const handleMouseEnter = () => {
      setIsHovered(true)
      onEnter?.()
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      onLeave?.()
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, onEnter, onLeave, enabled])

  return isHovered
}

// Hook for mouse following with spring physics
export function useMouseFollow<T extends HTMLElement>(
  ref: RefObject<T>,
  options: {
    stiffness?: number
    damping?: number
    mass?: number
    enabled?: boolean
  } = {}
) {
  const { stiffness = 0.1, damping = 0.8, mass = 1, enabled = true } = options
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  
  const mousePosition = useMousePosition({
    boundingRef: ref,
    throttleMs: 16,
    includeMovement: true,
  })

  useEffect(() => {
    if (!enabled || !ref.current) return

    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      const deltaTime = (time - lastTime) / 1000
      lastTime = time

      // Calculate force (spring)
      const forceX = (mousePosition.x - position.x) * stiffness
      const forceY = (mousePosition.y - position.y) * stiffness

      // Apply damping
      const dampedVelocityX = velocity.x * damping
      const dampedVelocityY = velocity.y * damping

      // Update velocity (F = ma, so a = F/m)
      const newVelocityX = dampedVelocityX + (forceX / mass) * deltaTime
      const newVelocityY = dampedVelocityY + (forceY / mass) * deltaTime

      // Update position
      const newPositionX = position.x + newVelocityX * deltaTime
      const newPositionY = position.y + newVelocityY * deltaTime

      setPosition({ x: newPositionX, y: newPositionY })
      setVelocity({ x: newVelocityX, y: newVelocityY })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition, position, velocity, stiffness, damping, mass, enabled, ref])

  return position
}