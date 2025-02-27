import Hero from "./components/hero"
import Solutions from "./components/solutions"
import Advantages from "./components/advantages"
import CaseStudies from "./components/case-studies"
import Contact from "./components/contact"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50">
      <Hero />
      <Solutions />
      <Advantages />
      <CaseStudies />
      <Contact />
    </main>
  )
}

