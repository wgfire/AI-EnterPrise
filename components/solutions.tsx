"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Brain, ImageIcon, BarChart3, Zap, TrendingUp, Shield } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"

const solutions = [
  {
    title: "智能决策引擎",
    description: "基于大规模语言模型的智能分析与决策系统",
    icon: Brain,
    color: "#3B82F6",
    stats: "决策速度提升 10倍",
    image: "/ai-decision-engine.svg",
    features: ["自然语言处理", "知识图谱", "多维度分析"],
  },
  {
    title: "计算机视觉平台",
    description: "高精度图像识别与视频分析处理平台",
    icon: ImageIcon,
    color: "#8B5CF6",
    stats: "识别准确率 99.9%",
    image: "/computer-vision.svg",
    features: ["目标检测", "场景理解", "行为分析"],
  },
  {
    title: "预测分析系统",
    description: "深度学习驱动的业务预测与风险评估",
    icon: BarChart3,
    color: "#6366F1",
    stats: "预测准确率 95%",
    image: "/predictive-analytics.svg",
    features: ["趋势预测", "风险评估", "实时监控"],
  },
  {
    title: "自动化流程",
    description: "智能工作流程自动化与任务协同",
    icon: Zap,
    color: "#EC4899",
    stats: "效率提升 300%",
    image: "/automation.svg",
    features: ["流程优化", "任务调度", "智能协作"],
  },
  {
    title: "增长优化器",
    description: "AI驱动的业务增长与优化策略",
    icon: TrendingUp,
    color: "#10B981",
    stats: "收入增长 150%",
    image: "/growth-optimizer.svg",
    features: ["用户画像", "场景策略", "精准营销"],
  },
  {
    title: "安全防护网",
    description: "智能安全监控与风险预警系统",
    icon: Shield,
    color: "#F59E0B",
    stats: "威胁检测率 99.99%",
    image: "/security-shield.svg",
    features: ["入侵检测", "异常识别", "实时预警"],
  },
]

function ProcessingNode() {
  return (
    <mesh>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#4299e1" wireframe />
    </mesh>
  )
}

type SolutionCardProps = {
  solution: {
    title: string
    description: string
    icon: any
    color: string
    stats: string
    image: string
    features: string[]
  }
  index: number
}

function SolutionCard({ solution, index }: SolutionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  const Icon = solution.icon

  return (
    <motion.div ref={cardRef} style={{ y, scale, opacity }} className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50" />

      <div className="relative h-full overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/90 p-6 backdrop-blur-sm">
        {/* Icon and Title */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3">
              <Icon className="h-6 w-6" style={{ color: solution.color }} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{solution.title}</h3>
            <p className="text-sm text-slate-400">{solution.description}</p>
          </div>
          <div className="h-20 w-20">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Float speed={5} rotationIntensity={1} floatIntensity={2}>
                <ProcessingNode />
              </Float>
            </Canvas>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-slate-900/90" />
          <Image
            src={solution.image || "/placeholder.svg"}
            alt={solution.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-2">
          {solution.features.map((feature, i) => (
            <span key={i} className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              {feature}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="text-sm font-medium text-blue-400">{solution.stats}</div>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}

export default function Solutions() {
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
            企业级AI解决方案
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              全方位赋能业务创新
            </span>
          </h2>
          <p className="max-w-[900px] text-slate-400 md:text-xl">打造智能化企业核心竞争力，引领行业数字化转型</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

