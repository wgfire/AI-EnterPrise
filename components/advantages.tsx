"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { Brain, Database, TrendingUp, Users, Target, Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Advantage {
  title: string
  problem: string
  solution: string
  benefits: string[]
  icon: LucideIcon
  color: string
  shape: "cube" | "sphere" | "cone"
}

const advantages: Advantage[] = [
  {
    title: "数据分析困境",
    problem: "传统数据分析耗时长、效率低，无法实时响应市场变化",
    solution: "AI实时分析引擎",
    benefits: ["分析效率提升10倍", "实时市场洞察", "精准决策支持"],
    icon: Database,
    color: "#3B82F6",
    shape: "cube",
  },
  {
    title: "运营管理瓶颈",
    problem: "人工运营成本高，流程繁琐，响应速度慢",
    solution: "智能运营平台",
    benefits: ["自动化工作流", "智能任务分配", "成本降低60%"],
    icon: Brain,
    color: "#8B5CF6",
    shape: "sphere",
  },
  {
    title: "营销投放难题",
    problem: "营销精准度低，投放效果差，ROI难以提升",
    solution: "智能营销系统",
    benefits: ["精准用户画像", "智能投放优化", "转化率提升300%"],
    icon: Target,
    color: "#EC4899",
    shape: "cone",
  },
  {
    title: "决策效率低下",
    problem: "决策周期长，信息滞后，错失市场机会",
    solution: "AI决策助手",
    benefits: ["实时决策建议", "风险预警提醒", "决策效率提升500%"],
    icon: TrendingUp,
    color: "#10B981",
    shape: "cube",
  },
  {
    title: "客户服务短板",
    problem: "服务响应慢，用户体验差，客户流失严重",
    solution: "智能客服系统",
    benefits: ["7×24小时响应", "多语言实时翻译", "满意度提升95%"],
    icon: Users,
    color: "#F59E0B",
    shape: "sphere",
  },
  {
    title: "资源调配失衡",
    problem: "资源分配不合理，效能低下，浪费严重",
    solution: "智能调配系统",
    benefits: ["智能资源分配", "效能提升200%", "成本优化40%"],
    icon: Clock,
    color: "#6366F1",
    shape: "cone",
  },
]

interface SimpleShapeProps {
  shape: "cube" | "sphere" | "cone"
  color: string
}

function SimpleShape({ shape, color }: SimpleShapeProps) {
  let geometry

  switch (shape) {
    case "cube":
      geometry = <boxGeometry args={[1, 1, 1]} />
      break
    case "sphere":
      geometry = <sphereGeometry args={[0.6, 16, 16]} />
      break
    case "cone":
      geometry = <coneGeometry args={[0.6, 1, 16]} />
      break
  }

  return (
    <mesh>
      {geometry}
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

interface AdvantageCardProps {
  advantage: Advantage
  index: number
}

function AdvantageCard({ advantage, index }: AdvantageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  const Icon = advantage.icon

  return (
    <motion.div ref={cardRef} style={{ y, scale, opacity }} className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50" />

      <div className="relative h-full overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/90 p-6 backdrop-blur-sm">
        {/* 3D Model */}
        <div className="absolute right-4 top-4 h-24 w-24">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
              <SimpleShape shape={advantage.shape} color={advantage.color} />
            </Float>
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4 flex items-center space-x-2">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Icon className="h-6 w-6" style={{ color: advantage.color }} />
            </div>
            <h3 className="text-xl font-bold text-white">{advantage.title}</h3>
          </div>

          {/* Problem Description */}
          <div className="mb-4 rounded-lg bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">{advantage.problem}</p>
          </div>

          {/* Solution */}
          <div className="mb-4">
            <div className="text-lg font-semibold text-blue-400">{advantage.solution}</div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            {advantage.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-slate-300">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}

export default function Advantages() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative w-full py-24 overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_100%)]" />

      {/* Content */}
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
            传统企业痛点解决方案
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              AI赋能转型升级
            </span>
          </h2>
          <p className="max-w-[900px] text-slate-400 md:text-xl">
            突破传统企业发展瓶颈，实现数智化转型，构建核心竞争优势
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-3">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} advantage={advantage} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

