"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    label: "Active Students",
    value: "50+",
    icon: "👥",
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Expert Instructors",
    value: "5+",
    icon: "👨‍🏫",
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Courses Available",
    value: "20+",
    icon: "📚",
    color: "from-orange-500 to-red-500",
  },
  {
    label: "Countries Reached",
    value: "10+",
    icon: "🌍",
    color: "from-green-500 to-emerald-500",
  },
];

export default function Stats() {
  const containerRef = useRef(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
          },
          opacity: 0,
          y: 40,
          scale: 0.8,
          duration: 0.7,
          delay: index * 0.15,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const targets = [50, 5, 20, 10];
    const timers = targets.map((target, index) => {
      let current = 0;
      const increment = target / 30;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, 50);
      return interval;
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                if (el) statsRef.current[index] = el;
              }}
              whileHover={{ scale: 1.08, y: -10 }}
              className="text-center p-8 rounded-xl glass hover:border-primary/50 transition-all cursor-pointer premium-hover"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className={`text-5xl mb-4 inline-block bg-gradient-to-br ${stat.color} bg-clip-text`}
              >
                {stat.icon}
              </motion.div>

              <motion.h3 className="text-4xl font-bold gradient-text mb-2">
                {counts[index]}+
              </motion.h3>
              <p className="text-muted-foreground font-medium">{stat.label}</p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
