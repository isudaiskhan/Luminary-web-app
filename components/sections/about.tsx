import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "Founded by education experts with 2+ years combined experience",
  "Trusted by 50+ learners across 10+ countries",
  "Partnerships with leading universities and companies",
  "AI-powered personalized learning paths",
];

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        x: 100,
        rotation: -8,
        duration: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-1 py-2 rounded-full ">About Luminary</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Transforming
              <span className="block mt-2 gradient-text-animated text-transparent bg-clip-text">
                Education Globally
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Luminary, we believe everyone deserves access to world-class
              education. Our mission is to democratize learning by connecting
              passionate instructors with ambitious learners worldwide, creating
              transformative educational experiences that shape careers and
              change lives.
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              {/* <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Learn More
              </motion.button> */}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-8 cursor-pointer py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-600 hover:to-indigo-700"
              >
                Learn More
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg border border-indigo-500 cursor-pointer text-foreground font-semibold hover:bg-primary/5 transition-all"
              >
                Join Community
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            ref={imageRef}
            className="relative h-96 lg:h-full min-h-[500px]"
          >
            {/* Animated gradient cards */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 blur-3xl"
            />

            {/* Card 1 */}
            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 30px 60px rgba(59, 130, 246, 0.3)",
              }}
              className="absolute top-0 left-0 w-72 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-lg opacity-90">Active Learners</p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
              />
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 30px 60px rgba(168, 85, 247, 0.3)",
              }}
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 6,
                delay: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-48 right-0 w-72 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">10+</div>
              <p className="text-lg opacity-90">Countries Reached</p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"
              />
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 30px 60px rgba(249, 115, 22, 0.3)",
              }}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                delay: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-1/4 w-72 h-48 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">50%</div>
              <p className="text-lg opacity-90">Satisfaction Rate</p>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 25,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
