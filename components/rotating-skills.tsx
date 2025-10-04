"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    title: "LLM & AI",
    color: "cyan",
    skills: ["LangGraph", "RAG Systems", "Prompt Engineering", "PyTorch", "Groq API", "LangChain"],
  },
  {
    title: "Robotics & IoT",
    color: "lime",
    skills: ["Raspberry Pi", "Sensor Integration", "Real-time Systems", "Embedded Systems", "ROS", "Arduino"],
  },
  {
    title: "Machine Learning",
    color: "pink",
    skills: [
      "LightGBM",
      "Time Series Analysis",
      "Feature Engineering",
      "Model Optimization",
      "XGBoost",
      "Scikit-learn",
    ],
  },
  {
    title: "Software Engineering",
    color: "orange",
    skills: ["Python", "Git & Version Control", "API Development", "System Design", "Docker", "FastAPI"],
  },
]

export function RotatingSkills() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skillCategories.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Category indicators */}
      <div className="flex justify-center gap-3 mb-8">
        {skillCategories.map((category, index) => (
          <button
            key={category.title}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeIndex === index
                ? `bg-${category.color}/20 text-${category.color} border-2 border-${category.color}`
                : "bg-card text-muted-foreground border-2 border-transparent hover:border-border"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Rotating content */}
      <div className="relative h-[400px] overflow-hidden">
        {skillCategories.map((category, index) => (
          <Card
            key={category.title}
            className={`absolute inset-0 p-8 bg-card border-border transition-all duration-700 ${
              activeIndex === index
                ? "opacity-100 translate-x-0"
                : index < activeIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
            style={{
              borderColor: activeIndex === index ? `var(--${category.color})` : undefined,
            }}
          >
            <h3 className={`text-3xl font-bold mb-8 text-${category.color}`}>{category.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill}
                  className={`p-4 bg-background rounded-lg border border-border hover:border-${category.color}/50 transition-all transform hover:scale-105`}
                  style={{
                    animationDelay: `${skillIndex * 100}ms`,
                    animation: activeIndex === index ? "fadeInUp 0.5s ease-out forwards" : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-${category.color}`} />
                    <span className="font-medium">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan via-pink to-lime transition-all duration-300"
          style={{ width: `${((activeIndex + 1) / skillCategories.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
