"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Send, Bot, Cpu, Shield, Zap, Users, BarChart, Cloud } from "lucide-react"

const advantages = [
  {
    icon: Cpu,
    title: "先进算法架构",
    description: "自主研发的深度学习框架，支持TB级数据训练",
    stats: "模型精度提升40%",
  },
  {
    icon: Shield,
    title: "企业级安全",
    description: "多重加密技术，确保数据安全与隐私保护",
    stats: "安全防护等级99.99%",
  },
  {
    icon: Zap,
    title: "高性能计算",
    description: "分布式计算集群，支持百万级并发处理",
    stats: "响应速度<50ms",
  },
  {
    icon: Users,
    title: "专家团队支持",
    description: "24小时提供专业技术支持",
    stats: "保障服务质量",
  },
  {
    icon: BarChart,
    title: "持续优化升级",
    description: "智能化运维系统，持续监控与性能优化",
    stats: "系统稳定性99.9%",
  },
  {
    icon: Cloud,
    title: "弹性扩展能力",
    description: "云原生架构设计，支持动态扩缩容",
    stats: "峰值支撑力提升300%",
  },
]

export default function Contact() {
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!phone || phone.length !== 11) {
      toast({
        title: "请输入正确的手机号",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    toast({
      title: "提交成功",
      description: "我们的专家团队将尽快与您联系",
    })
    
    setTimeout(() => {
      setIsSubmitting(false)
      setPhone("")
    }, 1500)
  }

  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-950">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_100%)]" />
      
      {/* 动态网格背景 */}
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
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-blue-500/10 px-6 py-2 text-base font-medium text-blue-400">
              技术优势
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                企业级AI解决方案
              </span>
            </h2>
            <p className="max-w-[900px] text-slate-400 text-xl md:text-2xl font-light">
              基于深度学习和大规模分布式计算的企业级AI平台，为您提供全方位的智能化解决方案
            </p>
          </motion.div>
        </div>

        {/* 技术优势展示 */}
        <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/90 p-8 backdrop-blur-sm"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-purple-500/10" />
              <div className="relative">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-all group-hover:scale-110 group-hover:bg-blue-500/20">
                  <advantage.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">{advantage.title}</h3>
                <p className="mb-4 text-base leading-relaxed text-slate-400">{advantage.description}</p>
                <div className="text-lg font-semibold text-blue-400">{advantage.stats}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-lg"
        >
          <div className="relative">
            {/* 机器人动画 */}
            <motion.div
              className="absolute -top-40 left-1/2 -translate-x-1/2"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
                  <Bot className="relative h-40 w-40 text-blue-400" />
                </div>
                {phone && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -right-28 top-4 rounded-xl border border-blue-500/20 bg-slate-900/90 p-4 backdrop-blur-sm"
                  >
                    <div className="text-base font-medium text-slate-400">您的手机号</div>
                    <div className="text-xl font-bold text-blue-400">{phone}</div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* 输入区域 */}
            <div className="relative mt-24 overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/90 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="请输入手机号"
                  className="flex-1 border-blue-500/20 bg-slate-800/50 text-xl placeholder:text-slate-500 h-14"
                  maxLength={11}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-14 px-8 text-lg"
                >
                  {isSubmitting ? (
                    "提交中..."
                  ) : (
                    <>
                      立即预约
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>

              {/* 装饰元素 */}
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast组件 */}
      <Toaster />
    </section>
  )
}

