"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Play,
  Sparkles,
  X,
  User,
  Mail,
  BookOpen,
  GraduationCap,
  Video,
} from "lucide-react";
import * as THREE from "three";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showStudentDialog, setShowStudentDialog] = useState(false);
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);

  // Three.js 3D Background Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create floating geometric shapes
    const geometries = [
      new THREE.TorusGeometry(0.7, 0.2, 16, 100),
      new THREE.OctahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.7),
      new THREE.TetrahedronGeometry(0.8),
    ];

    const material = new THREE.MeshPhongMaterial({
      color: 0x6f4df3,
      emissive: 0x6f4df3,
      emissiveIntensity: 0.3,
      shininess: 100,
      transparent: true,
      opacity: 0.6,
      wireframe: false,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9d7ff5,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const meshes = [];
    const positions = [
      { x: -3, y: 2, z: -2 },
      { x: 3, y: -2, z: -3 },
      { x: -2, y: -3, z: -1 },
      { x: 2.5, y: 2.5, z: -2.5 },
    ];

    geometries.forEach((geometry, i) => {
      const mesh = new THREE.Mesh(geometry, material.clone());
      const wireframe = new THREE.Mesh(geometry, wireframeMaterial.clone());

      mesh.position.set(positions[i].x, positions[i].y, positions[i].z);
      wireframe.position.set(positions[i].x, positions[i].y, positions[i].z);

      scene.add(mesh);
      scene.add(wireframe);
      meshes.push({
        solid: mesh,
        wireframe: wireframe,
        speed: 0.3 + Math.random() * 0.5,
      });
    });

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x9d7ff5,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6f4df3, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b9d, 1.5, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate meshes
      meshes.forEach((meshGroup, i) => {
        meshGroup.solid.rotation.x = elapsedTime * meshGroup.speed * 0.5;
        meshGroup.solid.rotation.y = elapsedTime * meshGroup.speed * 0.3;
        meshGroup.wireframe.rotation.x = elapsedTime * meshGroup.speed * 0.5;
        meshGroup.wireframe.rotation.y = elapsedTime * meshGroup.speed * 0.3;

        // Floating animation
        meshGroup.solid.position.y += Math.sin(elapsedTime + i) * 0.001;
        meshGroup.wireframe.position.y += Math.sin(elapsedTime + i) * 0.001;
      });

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.02;

      // Camera follow mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometries.forEach((g) => g.dispose());
      material.dispose();
      wireframeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Mouse tracking for other effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        duration: 1.2,
        opacity: 0,
        y: 60,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        duration: 1,
        opacity: 0,
        y: 40,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".hero-button", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        delay: 0.5,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <section
        ref={containerRef}
        className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-slate-950"
      >
        {/* 3D Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.7 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50 pointer-events-none" />

        {/* Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Text Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  <span className="text-sm font-semibold text-purple-400">
                    Welcome to Luminary
                  </span>
                </div>
                <h1
                  ref={titleRef}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white"
                >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                    Learn
                  </span>{" "}
                  Anything,{" "}
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Anytime
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="hero-subtitle text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed"
              >
                Master new skills from world-class instructors. Join millions of
                learners on Luminary and transform your future with personalized
                learning paths.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex gap-8 pt-8 border-t border-purple-500/30"
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    50+
                  </p>
                  <p className="text-sm text-slate-400">Active Students</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    30+
                  </p>
                  <p className="text-sm text-slate-400">Expert Courses</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    4.9★
                  </p>
                  <p className="text-sm text-slate-400">Average Rating</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="hero-image relative flex items-center justify-center"
            >
              <div className="relative w-full aspect-square">
                {/* Placeholder for your image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden ">
                  {/* ✅ Replace with your own image */}
                  <Image
                    src="/hero-image.png"
                    alt="Learning Illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Animated overlay gradient */}
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl"
                />
              </div>

              {/* Floating glow elements */}
              <motion.div
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Dialog */}
      <AnimatePresence>
        {showStudentDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowStudentDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
              />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowStudentDialog(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 border border-purple-500/30 text-purple-300 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Student Registration
                    </h2>
                    <p className="text-sm text-slate-400">
                      Start your learning journey
                    </p>
                  </div>
                </motion.div>

                {/* Form */}
                <form className="space-y-5">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Interested Course
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <select className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none">
                        <option value="">Select a course</option>
                        <option value="web-dev">Web Development</option>
                        <option value="design">UI/UX Design</option>
                        <option value="data-science">Data Science</option>
                        <option value="mobile">Mobile Development</option>
                      </select>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all mt-6"
                  >
                    Start Learning Now
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teacher Dialog */}
      <AnimatePresence>
        {showTeacherDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowTeacherDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl shadow-pink-500/20 border border-pink-500/30 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"
              />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowTeacherDialog(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 border border-pink-500/30 text-pink-300 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                    <Video className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Instructor Application
                    </h2>
                    <p className="text-sm text-slate-400">
                      Share your expertise with the world
                    </p>
                  </div>
                </motion.div>

                {/* Form */}
                <form className="space-y-5">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Expertise Area
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                      <select className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all appearance-none">
                        <option value="">Select your expertise</option>
                        <option value="web-dev">Web Development</option>
                        <option value="design">UI/UX Design</option>
                        <option value="data-science">Data Science</option>
                        <option value="mobile">Mobile Development</option>
                        <option value="marketing">Digital Marketing</option>
                      </select>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Brief Bio
                    </label>
                    <textarea
                      placeholder="Tell us about your teaching experience and what you're passionate about..."
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all resize-none"
                    />
                  </motion.div>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(236, 72, 153, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all mt-6"
                  >
                    Submit Application
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
