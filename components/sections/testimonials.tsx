"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import * as THREE from "three";
import {
  ArrowRight,
  Zap,
  Crown,
  Rocket,
  Sparkles,
  User,
  Mail,
  Phone,
  FileText,
  GraduationCap,
  Users,
  X,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tiers = [
  {
    id: 1,
    name: "Join as Member",
    description: "Become part of the Luminary community",
    icon: Zap,
    benefits: [
      "Access to exclusive courses",
      "Community support network",
      "Monthly webinars",
      "Career guidance",
    ],
    accentColor: "#6f4df3",
    stat: "10K+",
    statLabel: "Members",
  },
  {
    id: 2,
    name: "Become a Partner",
    description: "Collaborate and grow with Luminary",
    icon: Crown,
    benefits: [
      "Co-create content",
      "Revenue sharing model",
      "Priority support",
      "Marketing collaboration",
      "Exclusive partner events",
    ],
    accentColor: "#6f4df3",
    featured: true,
    stat: "500+",
    statLabel: "Partners",
  },
  {
    id: 3,
    name: "Invest in Luminary",
    description: "Be part of our growth story",
    icon: Rocket,
    benefits: [
      "Equity opportunities",
      "Board insights",
      "Strategic influence",
      "Exclusive investor updates",
      "Premium returns potential",
    ],
    accentColor: "#6f4df3",
    stat: "50M+",
    statLabel: "Raised",
  },
];

// Registration Dialog Component
function RegistrationDialog({
  isOpen,
  onClose,
  isDark = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+966",
    description: "",
    type: "investor",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      email: formData.email,
      firstName: formData.name.split(" ")[0] || formData.name,
      lastName: formData.name.split(" ")[1] || "",
      phone: formData.phone,
      countryCode: formData.countryCode,
      description: formData.description,
      type: "investor",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/campaign-user/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: isDark ? "dark" : "light",
        });
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      console.log("Registration successful:", data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "",
        description: "",
        type: "investor",
      });
      onClose();

      // Success notification
      toast.success("Thank you for registering! We'll get back to you soon.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: isDark ? "dark" : "light",
      });
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: isDark ? "dark" : "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 dark:text-white text-center"
              >
                Schedule a Discussion
              </motion.h2>
              <button
                onClick={onClose}
                className="absolute right-4 cursor-pointer top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex gap-2">
                  {/* Country Code */}
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="w-4 h-4" />
                      Country Code
                    </label>
                    <input
                      type="number"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      readOnly
                      className="w-28 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="+966"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FileText className="w-4 h-4" />
                  {formData.type === "student"
                    ? "When would be a good time to reach you"
                    : "Tell us about your consultation needs"}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={
                    formData.type === "student"
                      ? "Tell us what you'd like to discuss ..."
                      : "Describe what you'd like to achieve through partnership..."
                  }
                />
              </motion.div>

              {/* Submit */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-white cursor-pointer rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                }`}
              >
                <User className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Schedule Discussion"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Three.js Particle Background Component
function ThreeParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create multiple particle systems with different behaviors
    const particleSystems: THREE.Points[] = [];

    // Main glowing particles
    const createParticleSystem = (
      count: number,
      size: number,
      speed: number,
      color: THREE.Color
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        const radius = 300;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        velocities[i] = (Math.random() - 0.5) * speed;
        velocities[i + 1] = (Math.random() - 0.5) * speed;
        velocities[i + 2] = (Math.random() - 0.5) * speed;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "velocity",
        new THREE.BufferAttribute(velocities, 3)
      );

      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        map: createParticleTexture(),
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particleSystems.push(particles);
      return particles;
    };

    // Create glowing particle texture
    function createParticleTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d")!;

      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.4, "rgba(167, 139, 250, 0.8)");
      gradient.addColorStop(1, "rgba(111, 77, 243, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    // Create multiple layers
    createParticleSystem(3000, 4, 0.3, new THREE.Color(0x6f4df3));
    createParticleSystem(2000, 6, 0.15, new THREE.Color(0xa78bfa));
    createParticleSystem(1500, 8, 0.08, new THREE.Color(0xc4b5fd));

    // Add connecting lines between nearby particles
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6f4df3,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.02;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.02;

      particleSystems.forEach((particles, idx) => {
        const positions = particles.geometry.attributes.position
          .array as Float32Array;
        const velocities = particles.geometry.getAttribute("velocity")
          .array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          // Spiral motion
          const angle = time * 0.1 * (idx + 1);
          positions[i] += Math.cos(angle + i) * 0.5 + velocities[i];
          positions[i + 1] += Math.sin(angle + i) * 0.5 + velocities[i + 1];
          positions[i + 2] +=
            Math.sin(time * 0.5 + i * 0.01) * 0.3 + velocities[i + 2];

          // Mouse attraction/repulsion
          const dx = mouseRef.current.x * 100 - positions[i];
          const dy = mouseRef.current.y * 100 - positions[i + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            const force = (80 - dist) / 80;
            positions[i] -= dx * force * 0.5;
            positions[i + 1] -= dy * force * 0.5;
          }

          // Keep in bounds
          const maxDist = 300;
          const currentDist = Math.sqrt(
            positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
          );
          if (currentDist > maxDist) {
            positions[i] *= 0.95;
            positions[i + 1] *= 0.95;
            positions[i + 2] *= 0.95;
          }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = time * 0.05 * (idx + 1);
        particles.rotation.x = Math.sin(time * 0.1) * 0.2;
      });

      // Update connecting lines
      const linePositions: number[] = [];
      const mainPositions = particleSystems[0].geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < mainPositions.length; i += 30) {
        for (
          let j = i + 30;
          j < Math.min(i + 300, mainPositions.length);
          j += 30
        ) {
          const dx = mainPositions[i] - mainPositions[j];
          const dy = mainPositions[i + 1] - mainPositions[j + 1];
          const dz = mainPositions[i + 2] - mainPositions[j + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 50) {
            linePositions.push(
              mainPositions[i],
              mainPositions[i + 1],
              mainPositions[i + 2],
              mainPositions[j],
              mainPositions[j + 1],
              mainPositions[j + 2]
            );
          }
        }
      }

      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      camera.position.x += (mouseRef.current.x * 20 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 20 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      particleSystems.forEach((p) => {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      });
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function PartnershipSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // State for registration dialog
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <section
      ref={containerRef}
      className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black"
    >
      {/* Three.js Particle Background */}
      <ThreeParticleBackground />

      {/* Registration Dialog */}
      <RegistrationDialog
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        isDark={true}
      />

      {/* Content Overlay */}
      <motion.div style={{ opacity }} className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full border border-purple-500/40 bg-purple-500/10 backdrop-blur-xl"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-purple-400 tracking-wider">
                EXCLUSIVE OPPORTUNITIES
              </span>
            </motion.div>

            {/* Title with character animation */}
            <motion.h2 className="text-7xl font-black mb-8 text-balance leading-tight text-white">
              {"Shape the Future of ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateY: 90 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.03,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="inline-block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent"
              >
                Luminary
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Join our ecosystem as a member, partner, or investor. Choose your
              role and unlock extraordinary opportunities to grow, collaborate,
              and succeed together.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-24">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              const isFeatured = tier.featured;

              return (
                <motion.div
                  key={tier.id}
                  initial={{
                    opacity: 0,
                    y: 100,
                    rotateY: -90,
                    rotateX: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  viewport={{ once: true }}
                  style={{ y }}
                  className={`relative group ${
                    isFeatured ? "md:scale-105" : ""
                  }`}
                >
                  <motion.div
                    className={`relative h-full rounded-3xl border backdrop-blur-2xl overflow-hidden ${
                      isFeatured
                        ? "border-purple-500/80"
                        : "border-purple-500/30"
                    }`}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(111, 77, 243, 0.1) 0%, rgba(111, 77, 243, 0.05) 100%)",
                      boxShadow: "0 20px 60px rgba(111, 77, 243, 0.3)",
                    }}
                    whileFocus={{
                      scale: 1.05,
                      boxShadow: "0 30px 80px rgba(111, 77, 243, 0.5)",
                    }}
                  >
                    <div className="relative p-10 h-full flex flex-col">
                      {/* Icon */}
                      <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.2 + 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                        viewport={{ once: true }}
                        className="mb-10 p-5 rounded-2xl w-fit"
                        style={{
                          background: `${tier.accentColor}25`,
                        }}
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{ color: tier.accentColor }}
                        />
                      </motion.div>

                      {/* Title */}
                      <div className="mb-10">
                        <h3 className="text-3xl font-black mb-4 text-white">
                          {tier.name}
                        </h3>
                        <p className="text-base text-gray-400 leading-relaxed font-medium">
                          {tier.description}
                        </p>
                      </div>

                      {/* Benefits */}
                      <div className="flex-1 mb-12">
                        <ul className="space-y-4">
                          {tier.benefits.map((benefit, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.2 + i * 0.1,
                                duration: 0.5,
                                type: "spring",
                              }}
                              viewport={{ once: true }}
                              className="flex items-start gap-4"
                            >
                              <div
                                className="mt-2 w-3 h-3 rounded-full flex-shrink-0"
                                style={{ background: tier.accentColor }}
                              />
                              <span className="text-base text-gray-300 leading-relaxed font-medium">
                                {benefit}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsRegisterOpen(true)}
                        className="w-full py-5 px-8 rounded-2xl cursor-pointer font-black flex items-center justify-center gap-3 transition-all text-lg text-white"
                        style={{
                          background: `linear-gradient(135deg, ${tier.accentColor} 0%, ${tier.accentColor}cc 100%)`,
                          boxShadow: `0 10px 30px ${tier.accentColor}60`,
                        }}
                      >
                        <span>Get Started</span>
                        <ArrowRight className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-purple-500/40 backdrop-blur-2xl overflow-hidden p-16 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(111, 77, 243, 0.15) 0%, rgba(111, 77, 243, 0.05) 100%)",
              boxShadow: "0 0 60px rgba(111, 77, 243, 0.3)",
            }}
          >
            <h3 className="text-5xl font-black mb-6 text-white">
              Not Sure Which Path is Right?
            </h3>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Our team is ready to help you find the perfect opportunity that
              aligns with your goals and vision.
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRegisterOpen(true)}
              className="px-12 cursor-pointer py-6 rounded-2xl font-black text-white text-lg"
              style={{
                background:
                  "linear-gradient(135deg, #6f4df3 0%, #a78bfa 50%, #6f4df3 100%)",
                boxShadow: "0 0 50px rgba(111, 77, 243, 0.6)",
              }}
            >
              Schedule a Dissussion
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
}
