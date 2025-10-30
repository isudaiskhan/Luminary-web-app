"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Users, Award, Zap, Globe, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: BookOpen,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with 10+ years of experience in their fields",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Community Learning",
    description:
      "Connect with thousands of learners worldwide and grow together",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Certifications",
    description:
      "Earn recognized certificates that boost your professional profile",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Fast Learning",
    description: "Flexible pace learning that fits your schedule perfectly",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access courses from anywhere in the world, 24/7",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor your learning journey with detailed analytics and insights",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
          opacity: 0,
          y: 60,
          rotation: -5,
          duration: 0.8,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
            Why Choose <span className="gradient-text-animated">Luminary?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey with
            cutting-edge features
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                whileHover={{
                  y: -15,
                  boxShadow: "0 30px 60px rgba(111, 77, 243, 0.2)",
                }}
                className="p-8 rounded-xl glass hover:border-primary/50 transition-all duration-300 group cursor-pointer premium-hover"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg transition-all`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-6"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
