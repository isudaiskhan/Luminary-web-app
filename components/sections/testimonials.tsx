"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: "Sarah Anderson",
    role: "Product Designer",
    content:
      "Luminary transformed my career completely. The courses are incredibly well-structured, the instructors are true experts, and the community support is unmatched.",
    rating: 5,
    avatar: "👩‍💼",
    company: "Tech Innovations Inc",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Full Stack Developer",
    content:
      "The best investment I made for my skills. The community support is amazing, the content is always up-to-date, and I landed a senior position within 3 months.",
    rating: 5,
    avatar: "👨‍💻",
    company: "Digital Solutions Ltd",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Data Scientist",
    content:
      "Exceptional quality courses with real-world projects. I landed my dream job after completing the data science track. Highly recommended!",
    rating: 5,
    avatar: "👩‍🔬",
    company: "AI Research Labs",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Marketing Manager",
    content:
      "The digital marketing course gave me practical skills I use every day. The instructors share real strategies that actually work. Career growth guaranteed!",
    rating: 5,
    avatar: "👨‍💼",
    company: "Growth Marketing Co",
  },
]

export default function Testimonials() {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  return (
    <section ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            What Our <span className="gradient-text-animated">Students Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed their careers with Luminary
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                animate={{
                  opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0.3,
                  scale: index === currentIndex ? 1 : 0.95,
                  filter: Math.abs(index - currentIndex) <= 1 ? "blur(0px)" : "blur(4px)",
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-xl glass hover:border-primary/50 transition-all h-full flex flex-col premium-hover relative overflow-hidden"
                >
                  <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute top-4 right-4 opacity-10"
                  >
                    <Quote className="w-16 h-16 text-primary" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-1 mb-4 relative z-10"
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i }}>
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Content */}
                  <motion.p className="text-foreground mb-6 flex-1 italic leading-relaxed relative z-10">
                    "{testimonial.content}"
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 pt-6 border-t border-border relative z-10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="text-4xl"
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(111, 77, 243, 0.4)" }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(111, 77, 243, 0.4)" }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoPlay(false)
                }}
                animate={{
                  width: index === currentIndex ? 40 : 10,
                  backgroundColor: index === currentIndex ? "#6f4df3" : "#6f4df3",
                  opacity: index === currentIndex ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
