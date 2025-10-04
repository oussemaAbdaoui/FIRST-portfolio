"use client"

import { useEffect, useRef } from "react"

export function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const gridSize = 50
    let offset = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.05 + Math.sin(x * 0.01 + offset) * 0.03})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.05 + Math.sin(y * 0.01 + offset) * 0.03})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw intersection dots
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - window.scrollY - window.innerHeight / 2, 2),
          )

          const opacity = Math.max(0, 0.3 - distance / 1000)

          if (opacity > 0) {
            ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      offset += 0.01
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
