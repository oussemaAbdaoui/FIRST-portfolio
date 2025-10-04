"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"

export const projects = [
  {
    id: "llm-navigation",
    title: "Advanced LLM Navigation System",
    description: "SAAM architecture with 95% success rate for autonomous robot navigation using LangGraph and Groq API",
    image: "/autonomous-robot-with-llm-navigation-system-and-ne.jpg",
    technologies: ["LangGraph", "Groq API", "Raspberry Pi", "Python"],
    metrics: [
      { label: "+23% performance", color: "#00ff88" },
      { label: "95% success rate", color: "#00d4ff" },
    ],
    accentColor: "#00d4ff",
  },
  {
    id: "commodity-prediction",
    title: "Commodity Prediction Engine",
    description: "Top 15% in Mitsui Challenge with advanced time series forecasting using LightGBM and PyTorch",
    image: "/financial-trading-charts-with-ai-prediction-models.jpg",
    technologies: ["LightGBM", "PyTorch", "Time Series", "Python"],
    metrics: [
      { label: "Sharpe Ratio: 1.6", color: "#ff0080" },
      { label: "Top 15% ranking", color: "#ff6b35" },
    ],
    accentColor: "#ff0080",
  },
  {
    id: "crypto-prediction",
    title: "Crypto Prediction Engine",
    description: "LSTM-based system achieving 98% accuracy in price movement prediction with automated trading",
    image: "/cryptocurrency-trading-charts-with-lstm-neural-ne.jpg",
    technologies: ["PyTorch", "LSTM Networks", "Binance API", "Docker"],
    metrics: [
      { label: "98% accuracy", color: "#ff6b35" },
      { label: "22% returns", color: "#ff0080" },
    ],
    accentColor: "#ff6b35",
  },
  {
    id: "mail-server",
    title: "Enterprise Mail Server",
    description: "High-availability mail infrastructure serving 500+ users with enterprise-grade security",
    image: "/enterprise-server-infrastructure-with-email-syste.jpg",
    technologies: ["RHEL 9", "Postfix", "Dovecot", "MySQL", "TLS/SSL"],
    metrics: [
      { label: "99.9% uptime", color: "#00d4ff" },
      { label: "99.8% spam blocking", color: "#00ff88" },
    ],
    accentColor: "#00d4ff",
  },
  {
    id: "card-game",
    title: "Multiplayer Card Battle Game",
    description: "Sophisticated real-time multiplayer game with 15+ unique characters and complex mechanics",
    image: "/multiplayer-card-battle-game-interface-with-fanta.jpg",
    technologies: ["Java", "JavaFX", "Socket Programming", "Game Dev"],
    metrics: [
      { label: "15+ characters", color: "#00ff88" },
      { label: "Real-time multiplayer", color: "#ff0080" },
    ],
    accentColor: "#00ff88",
  },
]

export function ProjectsCarousel3D() {
  const [rotation, setRotation] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)

  const anglePerCard = 360 / projects.length
  const radius = 450

  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setRotation((prev) => prev - anglePerCard)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoRotating, anglePerCard])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setRotation((prev) => prev + anglePerCard)
        setIsAutoRotating(false)
      } else if (e.key === "ArrowRight") {
        setRotation((prev) => prev - anglePerCard)
        setIsAutoRotating(false)
      } else if (e.key === " ") {
        e.preventDefault()
        setIsAutoRotating((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [anglePerCard])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setRotation((prev) => prev - anglePerCard)
      } else {
        setRotation((prev) => prev + anglePerCard)
      }
      setIsAutoRotating(false)
    }
  }

  const rotateCarousel = (direction: "left" | "right") => {
    setRotation((prev) => prev + (direction === "left" ? anglePerCard : -anglePerCard))
    setIsAutoRotating(false)
  }

  const jumpToCard = (index: number) => {
    setRotation(-index * anglePerCard)
    setIsAutoRotating(false)
  }

  return (
    <div className="relative w-full">
      {/* 3D Carousel Container */}
      <div
        className="relative mx-auto"
        style={{
          height: "550px",
          perspective: "2000px",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: hoveredCard === null ? "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          }}
        >
          {projects.map((project, index) => {
            const angle = index * anglePerCard
            const isActive = Math.abs(((rotation % 360) + angle) % 360) < anglePerCard / 2

            return (
              <Card
                key={project.id}
                className="absolute w-[350px] bg-card/80 backdrop-blur border-2 transition-all duration-300 overflow-hidden"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) ${
                    hoveredCard === index ? "scale(1.1) translateZ(100px)" : ""
                  }`,
                  borderColor: isActive ? project.accentColor : "var(--border)",
                  boxShadow:
                    hoveredCard === index
                      ? `0 0 40px ${project.accentColor}40, 0 10px 60px rgba(0, 0, 0, 0.5)`
                      : isActive
                        ? `0 0 20px ${project.accentColor}20`
                        : "none",
                  opacity: isActive ? 1 : 0.5,
                  zIndex: hoveredCard === index ? 100 : isActive ? 10 : 1,
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "transform, opacity",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden bg-background">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"
                    style={{
                      background: `linear-gradient(to top, var(--background), transparent)`,
                    }}
                  />
                </div>

                {/* Project Content */}
                <div className="p-5">
                  <h3
                    className="text-xl font-bold mb-2 transition-colors"
                    style={{ color: isActive ? project.accentColor : "var(--foreground)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: `${project.accentColor}20`,
                          color: project.accentColor,
                          borderColor: `${project.accentColor}40`,
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-4">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }} />
                        <span className="font-semibold" style={{ color: metric.color }}>
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => rotateCarousel("left")}
          className="border-cyan text-cyan hover:bg-cyan/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className="border-pink text-pink hover:bg-pink/10"
        >
          {isAutoRotating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => rotateCarousel("right")}
          className="border-cyan text-cyan hover:bg-cyan/10"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => jumpToCard(index)}
            className="group relative"
            aria-label={`Jump to ${project.title}`}
          >
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  Math.abs(((rotation % 360) + index * anglePerCard) % 360) < anglePerCard / 2
                    ? project.accentColor
                    : "var(--muted)",
                transform:
                  Math.abs(((rotation % 360) + index * anglePerCard) % 360) < anglePerCard / 2
                    ? "scale(1.5)"
                    : "scale(1)",
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs bg-card border border-border rounded px-2 py-1 pointer-events-none">
              {project.title}
            </div>
          </button>
        ))}
      </div>

      {/* Keyboard Hints */}
      <div className="text-center mt-6 text-xs text-muted-foreground">
        Use arrow keys to navigate • Spacebar to pause/play • Hover to zoom
      </div>
    </div>
  )
}
