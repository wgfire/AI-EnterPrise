"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, Center } from "@react-three/drei"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  BarChart,
  Users,
  TrendingUp,
  Award,
  Brain,
  Clock,
  Shield,
  Zap,
  Star,
  CheckCircle,
  Target,
} from "lucide-react"

const cases = [
  {
    title: "某大型金融机构",
    description: "通过AI智能风控系统，显著提升贷款审批效率，降低风险率",
    image: "/financial-ai.svg",
    logo: "/financial-ai.svg",
    stats: [
      { label: "审批效率", value: "提升800%", icon: TrendingUp },
      { label: "风险识别", value: "准确率99.9%", icon: BarChart },
      { label: "每日处理", value: "10万+申请", icon: Users },
    ],
    tags: ["金融科技", "风险控制", "流程自动化"],
    industry: "金融服务",
    testimonial: {
      content: "AI系统帮助我们将贷款审批时间从3天缩短到10分钟，同时显著提高了风险识别准确率。",
      author: "张总监",
      role: "风控负责人",
    },
  },
  {
    title: "某智能制造企业",
    description: "部署AI视觉质检系统，实现生产线全自动化质量管控",
    image: "/manufacturing-ai.svg",
    logo: "/manufacturing-ai.svg",
    stats: [
      { label: "检测效率", value: "提升500%", icon: TrendingUp },
      { label: "准确率", value: "99.99%", icon: BarChart },
      { label: "成本节省", value: "降低60%", icon: Users },
    ],
    tags: ["智能制造", "计算机视觉", "质量控制"],
    industry: "制造业",
    testimonial: {
      content: "AI质检系统不仅提高了我们的产品质量，还大幅降低了人工成本，实现了24小时不间断运作。",
      author: "李经理",
      role: "生产总监",
    },
  },
  {
    title: "某电商平台",
    description: "基于AI的个性化推荐系统，大幅提升用户转化率和留存",
    image: "/ecommerce-ai.svg",
    logo: "/ecommerce-ai.svg",
    stats: [
      { label: "转化率", value: "提升200%", icon: TrendingUp },
      { label: "用户留存", value: "提升150%", icon: BarChart },
      { label: "营收增长", value: "增长180%", icon: Users },
    ],
    tags: ["电商平台", "智能推荐", "用户增长"],
    industry: "电子商务",
    testimonial: {
      content: "个性化推荐系统极大提升了用户体验，帮助我们实现了营收的快速增长。",
      author: "王总监",
      role: "产品负责人",
    },
  },
]

function AnimatedTitle() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Center>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12}>
            Success Stories
            <meshStandardMaterial color="#60A5FA" metalness={0.8} roughness={0.2} />
          </Text3D>
        </Float>
      </Center>
    </Canvas>
  )
}

function ProcessingNode() {
  return (
    <mesh>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#4299e1" wireframe />
    </mesh>
  )
}

function CaseCard({ caseStudy, index }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, opacity, rotateY }}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Glowing Effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50" />

      <Card className="relative h-full overflow-hidden rounded-2xl border-blue-500/20 bg-slate-900/90 backdrop-blur-sm">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-slate-900/90" />
          <Image
            src={caseStudy.image || "/placeholder.svg"}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Company Logo */}
          <div className="absolute bottom-4 left-4 z-20 h-12 w-12 overflow-hidden rounded-full border-2 border-white/10 bg-slate-900/50 p-2 backdrop-blur-sm">
            <Image
              src={caseStudy.logo || "/placeholder.svg"}
              alt={`${caseStudy.title} logo`}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute right-4 top-4 h-20 w-20">
            <Canvas>
              <ambientLight intensity={0.5} />
              <Float speed={5} rotationIntensity={1} floatIntensity={2}>
                <ProcessingNode />
              </Float>
            </Canvas>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-20 p-6">
          {/* Industry Badge */}
          <div className="mb-4">
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              {caseStudy.industry}
            </Badge>
          </div>

          {/* Title & Description */}
          <h3 className="mb-2 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {caseStudy.title}
          </h3>
          <p className="mb-4 text-sm text-slate-400">{caseStudy.description}</p>

          {/* Stats Grid */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            {caseStudy.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-blue-400" />
                <div className="text-xs text-slate-400">{stat.label}</div>
                <div className="text-sm font-bold text-blue-400">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mb-4 rounded-lg bg-blue-500/5 p-4">
            <p className="mb-2 text-sm italic text-slate-400">"{caseStudy.testimonial.content}"</p>
            <div className="text-xs text-blue-400">
              {caseStudy.testimonial.author} · {caseStudy.testimonial.role}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Hover Arrow */}
          <div className="absolute right-6 top-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-6 w-6 text-blue-400" />
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
      </Card>
    </motion.div>
  )
}

const stats = [
  {
    category: "AI技术实力",
    items: [
      { label: "算法精度", value: "99.9%", icon: Brain, description: "业界领先的AI模型准确率" },
      { label: "处理速度", value: "50ms", icon: Zap, description: "极速响应时间" },
      { label: "服务可用性", value: "99.99%", icon: Shield, description: "企业级稳定性保障" },
    ],
  },
  {
    category: "服务能力",
    items: [
      { label: "技术专利", value: "200+", icon: Award, description: "核心技术专利储备" },
      { label: "研发团队", value: "500+", icon: Users, description: "AI算法专家团队" },
      { label: "迭代周期", value: "2周", icon: Clock, description: "快速迭代更新" },
    ],
  },
  {
    category: "应用成果",
    items: [
      { label: "客户满意度", value: "98%", icon: Star, description: "客户推荐评分" },
      { label: "平均ROI", value: "300%", icon: TrendingUp, description: "客户投资回报率" },
      { label: "实施成功率", value: "100%", icon: CheckCircle, description: "项目交付成功率" },
    ],
  },
  {
    category: "行业影响",
    items: [
      { label: "标杆案例", value: "50+", icon: Target, description: "各行业头部企业案例" },
      { label: "数据规模", value: "100TB+", icon: BarChart, description: "日处理数据量" },
      { label: "AI模型", value: "1000+", icon: Brain, description: "预训练模型规模" },
    ],
  },
]

function StatsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto mt-16 max-w-7xl rounded-2xl border border-blue-500/20 bg-slate-900/50 backdrop-blur-sm"
    >
      <div className="grid gap-8 p-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((section, i) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-blue-400">{section.category}</h3>
            <div className="space-y-6">
              {section.items.map((item, j) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: j * 0.1 }}
                  className="group flex items-start space-x-3"
                >
                  <div className="rounded-lg bg-blue-500/10 p-2 transition-colors group-hover:bg-blue-500/20">
                    <item.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-white">{item.value}</span>
                      <span className="text-sm text-slate-400">{item.label}</span>
                    </div>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const containerRef = useRef(null)
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
        className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_100%)]" />

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(#4299e1 1px, transparent 1px),
                           linear-gradient(to right, #4299e1 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="relative h-20 w-full">
              <AnimatedTitle />
            </div>
            <div className="inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
              客户案例
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                信任源于实力
              </span>
            </h2>
            <p className="max-w-[900px] text-slate-400 md:text-xl">深度赋能各行业数字化转型，携手客户共创智能化未来</p>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-3">
          {cases.map((caseStudy, index) => (
            <CaseCard key={index} caseStudy={caseStudy} index={index} />
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <StatsSection />
      </div>
    </section>
  )
}

