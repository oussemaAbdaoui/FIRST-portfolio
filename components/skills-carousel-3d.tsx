"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

export const skillCards = [
  {
    id: "llm-ai",
    category: "LLM & AI",
    title: "Large Language Models",
    skills: [
      { name: "LangGraph", level: 95, projects: 2 },
      { name: "LangChain", level: 90, projects: 2 },
      { name: "OpenAI GPT-4", level: 88, projects: 1 },
      { name: "LLM Agents", level: 85, projects: 1 },
      { name: "Prompt Engineering", level: 90, projects: 2 },
      { name: "RAG Systems", level: 92, projects: 1 },
    ],
    description: "Building intelligent agents and retrieval-augmented systems",
    accentColor: "#00d4ff",
    featuredProject: "Multilingual AI Assistant",
  },
  {
    id: "rag-retrieval",
    category: "LLM & AI",
    title: "RAG & Information Systems",
    skills: [
      { name: "Vector Databases", level: 88, projects: 1 },
      { name: "Document Parsing", level: 85, projects: 1 },
      { name: "Notion API", level: 82, projects: 1 },
      { name: "PDF Processing", level: 80, projects: 1 },
      { name: "Semantic Search", level: 85, projects: 1 },
      { name: "Citation Generation", level: 83, projects: 1 },
    ],
    description: "Advanced retrieval and document intelligence systems",
    accentColor: "#00d4ff",
    featuredProject: "Multilingual AI Assistant",
  },
  {
    id: "ml-frameworks",
    category: "ML Frameworks",
    title: "ML & Deep Learning",
    skills: [
      { name: "PyTorch", level: 88, projects: 2 },
      { name: "TensorFlow", level: 82, projects: 1 },
      { name: "LightGBM", level: 87, projects: 1 },
      { name: "Scikit-learn", level: 85, projects: 2 },
      { name: "Hugging Face", level: 80, projects: 1 },
      { name: "Hyperparameter Tuning", level: 83, projects: 2 },
    ],
    description: "End-to-end machine learning model development",
    accentColor: "#ff0080",
    featuredProject: "Mitsui Commodity Prediction",
  },
  {
    id: "evaluation-benchmarking",
    category: "ML Frameworks",
    title: "Evaluation Systems",
    skills: [
      { name: "DeepEval", level: 85, projects: 1 },
      { name: "Custom Metrics", level: 88, projects: 2 },
      { name: "A/B Testing", level: 82, projects: 1 },
      { name: "Multi-scenario Evaluation", level: 85, projects: 1 },
    ],
    description: "Comprehensive model evaluation and performance analysis",
    accentColor: "#ff0080",
    featuredProject: "LLM Navigation System",
  },
  {
    id: "edge-iot",
    category: "Robotics & IoT",
    title: "Edge & IoT Systems",
    skills: [
      { name: "Raspberry Pi", level: 85, projects: 1 },
      { name: "Arduino", level: 80, projects: 1 },
      { name: "STM32", level: 75, projects: 0 },
      { name: "Real-time Systems", level: 82, projects: 1 },
      { name: "Sensor Integration", level: 83, projects: 1 },
    ],
    description: "Embedded systems and real-time computing",
    accentColor: "#00ff88",
    featuredProject: "LLM Navigation System",
  },
  {
    id: "financial-ml",
    category: "ML Frameworks",
    title: "Financial AI",
    skills: [
      { name: "Time Series Analysis", level: 85, projects: 2 },
      { name: "LSTM Networks", level: 83, projects: 1 },
      { name: "Technical Indicators", level: 87, projects: 1 },
      { name: "Backtesting", level: 82, projects: 1 },
      { name: "Financial APIs", level: 80, projects: 1 },
    ],
    description: "Advanced financial forecasting and analysis",
    accentColor: "#ff0080",
    featuredProject: "Crypto Prediction Engine",
  },
]

export function SkillsCarousel3D() {
  const [rotation, setRotation] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)

  const anglePerCard = 360 / skillCards.length
  const radius = 400 // Distance from center

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
          height: "500px",
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
          {skillCards.map((card, index) => {
            const angle = index * anglePerCard
            const isActive = Math.abs(((rotation % 360) + angle) % 360) < anglePerCard / 2

            return (
              <Card
                key={card.id}
                className="absolute w-[320px] bg-card/80 backdrop-blur border-2 transition-all duration-300"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) ${
                    hoveredCard === index ? "scale(1.1) translateZ(100px)" : ""
                  }`,
                  borderColor: isActive ? card.accentColor : "var(--border)",
                  boxShadow:
                    hoveredCard === index
                      ? `0 0 40px ${card.accentColor}40, 0 10px 60px rgba(0, 0, 0, 0.5)`
                      : isActive
                        ? `0 0 20px ${card.accentColor}20`
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
                <div className="p-5">
                  {/* Card Header */}
                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className="mb-2"
                      style={{
                        backgroundColor: `${card.accentColor}20`,
                        color: card.accentColor,
                        borderColor: `${card.accentColor}40`,
                      }}
                    >
                      {card.category}
                    </Badge>
                    <h3 className="text-lg font-bold" style={{ color: card.accentColor }}>
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{card.description}</p>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {card.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className="space-y-1"
                        style={{
                          animation: isActive ? `fadeInUp 0.5s ease-out ${skillIndex * 0.1}s forwards` : "none",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{skill.projects} projects</span>
                            <span className="text-xs font-semibold" style={{ color: card.accentColor }}>
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isActive ? `${skill.level}%` : "0%",
                              backgroundColor: card.accentColor,
                              transformOrigin: "left",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Featured Project */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">Featured in:</p>
                    <p className="text-sm font-semibold" style={{ color: card.accentColor }}>
                      {card.featuredProject}
                    </p>
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
        {skillCards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => jumpToCard(index)}
            className="group relative"
            aria-label={`Jump to ${card.title}`}
          >
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  Math.abs(((rotation % 360) + index * anglePerCard) % 360) < anglePerCard / 2
                    ? card.accentColor
                    : "var(--muted)",
                transform:
                  Math.abs(((rotation % 360) + index * anglePerCard) % 360) < anglePerCard / 2
                    ? "scale(1.5)"
                    : "scale(1)",
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs bg-card border border-border rounded px-2 py-1 pointer-events-none">
              {card.title}
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
