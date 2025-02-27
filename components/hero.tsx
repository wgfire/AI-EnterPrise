"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { Float, Stars } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

function AnimatedShape() {
  return (
    <mesh>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#4299e1" wireframe />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <group>
          <AnimatedShape />
          <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        </group>
      </Float>
    </Canvas>
  )
}

interface StatsCardProps {
  number: string
  label: string
  delay?: number
}

function StatsCard({ number, label, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-xl bg-slate-800/50 p-4 hover:bg-slate-800/70"
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur transition-opacity group-hover:opacity-30" />
      <div className="relative">
        <div className="text-4xl font-bold text-blue-400">{number}</div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </motion.div>
  )
}

function ProcessingIndicator() {
  return (
    <div className="flex items-center space-x-2 text-sm text-blue-400">
      <div className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
      <span>AI实时处理中...</span>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_100%)]" />

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#4299e1 1px, transparent 1px),
                           linear-gradient(to right, #4299e1 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* 3D Scene */}
      <motion.div style={{ opacity }} className="absolute inset-0 z-0">
        <Scene />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <ProcessingIndicator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-sm font-medium">
                新一代企业级AI解决方案
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  AI赋能企业创新
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl lg:text-2xl">
                释放数据潜能 · 加速业务增长 · 引领行业变革
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatsCard number="300%" label="效率提升" delay={0.1} />
              <StatsCard number="85%" label="成本降低" delay={0.2} />
              <StatsCard number="99.9%" label="准确率" delay={0.3} />
              <StatsCard number="1000+" label="企业案例" delay={0.4} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 min-[400px]:flex-row"
            >
              <Button
                size="lg"
                className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg h-12 px-8"
              >
                <span className="relative z-10">立即体验</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 blur transition-opacity group-hover:opacity-50" />
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </section>
  )
}

