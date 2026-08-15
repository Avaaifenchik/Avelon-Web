"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Adobe_AnimV3",
    avatar: "/adobev3.png",
    game: "Эндермен",
    price: "374₽",
    rating: 10,
    text: "Запускали 10+ человек пока не падал * 60+ модов 👌",
  },
  {
    id: 2,
    name: "Xinevi",
    avatar: "/Xinevi.png",
    game: "Эндермен",
    price: "374₽",
    rating: 10,
    text: "Очень хорошее железо, сборка на 250+ модов (именно серверных) летает, еще и ресурсы за буст накинули ❤️",
  },
  {
    id: 3,
    name: "MersyCSwag",
    avatar: "/mersyez.png",
    game: "Зомби",
    price: "132",
    rating: 7,
    text: "Чото ноды вырубаются и вечно делают все а так все мощное",
  },
]

export function Testimonials() {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateIndicator = () => {
      if (!dotsRef.current) return
      const activeDot = dotsRef.current.querySelector(`[data-index="${activeIndex}"]`) as HTMLButtonElement
      if (activeDot) {
        setIndicatorStyle({
          width: activeDot.offsetWidth,
          left: activeDot.offsetLeft,
        })
      }
    }
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeIndex])

  return (
    <section className="px-3 sm:px-8 py-12 sm:py-20 md:px-16 lg:px-24">
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
       
        {/* Mobile carousel dots (optional, for future enhancement) */}
        <div ref={dotsRef} className="relative mt-6 flex justify-center gap-2 md:hidden">
          <div
            className="absolute top-0 h-2 rounded-full bg-primary transition-all duration-300 ease-out"
            style={{
              width: indicatorStyle.width,
              left: indicatorStyle.left,
            }}
          />
          {testimonials.map((_, index) => (
            <button
              key={index}
              data-index={index}
              onClick={() => setActiveIndex(index)}
              className={`relative z-10 size-2 rounded-full transition-colors ${
                activeIndex === index ? "bg-transparent" : "bg-muted/50"
              }`}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
