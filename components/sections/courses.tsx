"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Users, Clock, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 1,
    title: "Web Development Masterclass",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 12500,
    duration: "40 hours",
    price: "$99",
    image: "/courses-1.png",
    category: "Development",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Mike Chen",
    rating: 4.8,
    students: 8900,
    duration: "35 hours",
    price: "$79",
    image: "/courses-2.png",
    category: "Design",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Advanced React Patterns",
    instructor: "Emma Davis",
    rating: 4.9,
    students: 15200,
    duration: "45 hours",
    price: "$129",
    image: "/courses-3.png",
    category: "Development",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Alex Rodriguez",
    rating: 4.7,
    students: 6800,
    duration: "30 hours",
    price: "$69",
    image: "/courses-4.png",
    category: "Marketing",
    level: "Beginner",
  },
  {
    id: 5,
    title: "Data Science with Python",
    instructor: "Dr. Lisa Wang",
    rating: 4.9,
    students: 11200,
    duration: "50 hours",
    price: "$149",
    image: "/courses-5.png",
    category: "Data Science",
    level: "Advanced",
  },
  {
    id: 6,
    title: "Mobile App Development",
    instructor: "James Wilson",
    rating: 4.8,
    students: 9500,
    duration: "42 hours",
    price: "$119",
    image: "/courses-6.png",
    category: "Development",
    level: "Intermediate",
  },
];

export default function Courses() {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".course-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        opacity: 0,
        y: 60,
        rotation: -3,
        duration: 0.7,
        stagger: 0.12,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="courses"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
            Featured <span className="gradient-text-animated">Courses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular courses taught by industry experts with
            real-world projects
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="course-card group cursor-pointer"
              onMouseEnter={() => setHoveredId(course.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-xl overflow-hidden glass hover:border-primary/50 transition-all duration-300 h-full flex flex-col premium-hover">
                <motion.div
                  className="h-48 relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${course.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  animate={
                    hoveredId === course.id ? { scale: 1.08 } : { scale: 1 }
                  }
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                    animate={
                      hoveredId === course.id ? { opacity: 1 } : { opacity: 0 }
                    }
                  />

                  {/* Level badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        hoveredId === course.id
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0.7, scale: 0.9 }
                      }
                      className="text-xs font-bold text-white bg-primary/80 px-3 py-1 rounded-full backdrop-blur"
                    >
                      {course.level}
                    </motion.span>
                  </div>

                  {/* Enroll button */}
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    animate={
                      hoveredId === course.id
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                  >
                    Enroll Now
                  </motion.button>
                </motion.div>

                {/* Course Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.instructor}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm flex-wrap">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1"
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1"
                    >
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{(course.students / 1000).toFixed(1)}K</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1"
                    >
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </motion.div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold gradient-text">
                        {course.price}
                      </span>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="flex items-center gap-1 text-xs text-green-500 mt-1"
                      >
                        <TrendingUp className="w-3 h-3" /> Trending
                      </motion.div>
                    </div>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(111, 77, 243, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary/20 transition-colors"
                    >
                      View
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 40px rgba(111, 77, 243, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
          >
            Explore All Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
