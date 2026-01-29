'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Network, 
  Database, 
  Server, 
  Cpu, 
  Cloud, 
  Zap,
  X,
  Shield,
  Layers,
  GitBranch
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nodes = [
  {
    id: 'api',
    title: 'API Gateway',
    description: 'Routes incoming requests, handles authentication, rate limiting, and transformations.',
    icon: Network,
    position: { x: 10, y: 20 },
    connections: ['services'],
    color: 'border-blue-500/30 bg-blue-500/10',
    iconColor: 'text-blue-500',
    stats: ['10K RPS', '5ms latency', '99.99% uptime'],
    category: 'Frontend',
  },
  {
    id: 'services',
    title: 'Microservices',
    description: 'Independent services handling specific business logic domains with auto-scaling.',
    icon: Server,
    position: { x: 35, y: 45 },
    connections: ['cache', 'database', 'queue'],
    color: 'border-emerald-500/30 bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    stats: ['15+ services', 'Kubernetes', 'Auto-scaling'],
    category: 'Backend',
  },
  {
    id: 'cache',
    title: 'Cache Layer',
    description: 'Redis cluster for frequently accessed data with intelligent invalidation.',
    icon: Zap,
    position: { x: 75, y: 20 },
    connections: ['database'],
    color: 'border-amber-500/30 bg-amber-500/10',
    iconColor: 'text-amber-500',
    stats: ['Redis Cluster', '10M ops/s', 'Sub-millisecond'],
    category: 'Databases',
  },
  {
    id: 'database',
    title: 'Database',
    description: 'PostgreSQL with read replicas, automated backups, and connection pooling.',
    icon: Database,
    position: { x: 35, y: 70 },
    connections: [],
    color: 'border-purple-500/30 bg-purple-500/10',
    iconColor: 'text-purple-500',
    stats: ['PostgreSQL', 'Read replicas', 'Automated backup'],
    category: 'Databases',
  },
  {
    id: 'queue',
    title: 'Message Queue',
    description: 'Apache Kafka for event-driven architecture and asynchronous processing.',
    icon: Cloud,
    position: { x: 75, y: 70 },
    connections: [],
    color: 'border-rose-500/30 bg-rose-500/10',
    iconColor: 'text-rose-500',
    stats: ['Apache Kafka', 'Event-driven', 'Exactly-once'],
    category: 'Infrastructure',
  },
]

export function ArchitectureDiagram({ hoveredCategory }: { hoveredCategory: string | null }) {
  const [connections] = useState([
    { from: 'api', to: 'services', label: 'HTTPS' },
    { from: 'services', to: 'cache', label: 'Redis' },
    { from: 'services', to: 'database', label: 'PostgreSQL' },
    { from: 'services', to: 'queue', label: 'Kafka' },
    { from: 'cache', to: 'database', label: 'Cache miss' },
  ])

  return (
    <div className="relative h-[500px] md:h-[600px] rounded-2xl bg-gradient-to-br from-stone-100 to-stone-50 dark:from-stone-900 dark:to-stone-950 p-6 md:p-8 overflow-hidden border border-stone-300 dark:border-stone-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-5" />
      
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-bronze-500/5 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{ 
          x: [100, 0, 100],
          y: [50, 0, 50],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-bronze-500/3 to-transparent rounded-full blur-3xl"
      />

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-bronze-500" />
          </marker>
          <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(30, 33%, 56%)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="hsl(30, 33%, 56%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(30, 33%, 56%)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from)
          const toNode = nodes.find(n => n.id === conn.to)
          
          if (!fromNode || !toNode) return null
          
          const isActive = hoveredCategory && (fromNode.category === hoveredCategory || toNode.category === hoveredCategory)
          
          return (
            <motion.g key={conn.from + conn.to}>
              {/* Connection line */}
              <motion.line
                x1={`${fromNode.position.x}%`}
                y1={`${fromNode.position.y}%`}
                x2={`${toNode.position.x}%`}
                y2={`${toNode.position.y}%`}
                stroke={isActive ? "url(#connection-gradient)" : "hsl(0, 0%, 80%)"}
                strokeWidth={isActive ? 3 : 1}
                strokeDasharray={isActive ? "0" : "5,5"}
                markerEnd={isActive ? "url(#arrowhead)" : undefined}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
              
              {/* Connection label */}
              <motion.text
                x={`${(fromNode.position.x + toNode.position.x) / 2}%`}
                y={`${(fromNode.position.y + toNode.position.y) / 2}%`}
                textAnchor="middle"
                dy="-10"
                className="text-xs font-mono fill-stone-600 dark:fill-stone-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.5 }}
              >
                {conn.label}
              </motion.text>
            </motion.g>
          )
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon
        const isActive = hoveredCategory === node.category
        
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: node.position.x / 100,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className={cn(
              "absolute w-28 h-28 md:w-32 md:h-32 rounded-xl border-2",
              node.color,
              "flex flex-col items-center justify-center p-4",
              "transition-all duration-300 group",
              isActive ? "shadow-2xl scale-110" : "shadow-lg"
            )}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Node glow effect */}
            {isActive && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-bronze-500/20 to-transparent animate-pulse" />
            )}

            {/* Icon */}
            <div className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3",
              "bg-white/50 dark:bg-black/50 backdrop-blur-sm",
              "group-hover:scale-110 transition-transform"
            )}>
              <Icon className={cn("w-6 h-6 md:w-8 md:h-8", node.iconColor)} />
            </div>

            {/* Title */}
            <h4 className="font-serif text-xs md:text-sm text-center mb-1 line-clamp-1">
              {node.title}
            </h4>
            
            {/* Status indicator */}
            <div className="flex items-center gap-1 mt-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isActive ? "bg-emerald-500 animate-pulse" : "bg-stone-400"
              )} />
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {isActive ? 'Active' : 'Ready'}
              </span>
            </div>

            {/* Hover indicator */}
            <div className="absolute -inset-1 rounded-xl border-2 border-transparent group-hover:border-bronze-500/30 transition-colors pointer-events-none" />
          </motion.div>
        )
      })}
    </div>
  )
}