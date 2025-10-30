"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Mail, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  color: string;
  social: {
    email: string;
    linkedin: string;
    twitter: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Saleh",
    role: "CEO",
    bio: "Visionary leader driving innovation and long-term growth for Luminary.",
    image: "/Test.png",
    color: "bg-[#6f4df3]",
    social: {
      email: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Riyadh Al Ghamdi",
    role: "CFO",
    bio: "Financial strategist ensuring sustainable growth and operational financial excellence.",
    image: "/Test.png",
    color: "bg-[#6f4df3]",
    social: {
      email: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Ziad Abu Hussain",
    role: "COO",
    bio: "Operational expert optimizing efficiency, performance, and company-wide productivity daily.",
    image: "/Test.png",
    color: "bg-[#6f4df3]",
    social: {
      email: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  // {
  //   id: 4,
  //   name: "Michael Park",
  //   role: "Head of Community",
  //   bio: "Community builder focused on learner engagement",
  //   image: "/professional-man-community.jpg",
  //   color: "bg-[#6f4df3]",
  //   social: {
  //     email: "#",
  //     linkedin: "#",
  //     twitter: "#",
  //   },
  // },
  // {
  //   id: 5,
  //   name: "Lisa Wang",
  //   role: "Head of Design",
  //   bio: "UX/UI specialist creating beautiful learning experiences",
  //   image: "/professional-woman-designer.png",
  //   color: "bg-[#6f4df3]",
  //   social: {
  //     email: "#",
  //     linkedin: "#",
  //     twitter: "#",
  //   },
  // },
  // {
  //   id: 6,
  //   name: "James Wilson",
  //   role: "Head of Growth",
  //   bio: "Growth strategist scaling education globally",
  //   image: "/professional-man-growth.jpg",
  //   color: "bg-[#6f4df3]",
  //   social: {
  //     email: "#",
  //     linkedin: "#",
  //     twitter: "#",
  //   },
  // },
];

export default function Team() {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      id="team"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden "
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
            Meet Our <span className="gradient-text-animated">Team</span>
          </h2>
          <p className="text-lg text-purple-100/80 max-w-3xl mx-auto leading-relaxed">
            Our diverse team of educators, engineers, and innovators are
            dedicated to revolutionizing how the world learns.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer"
            >
              <div className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 hover:translate-y-[-8px]">
                {/* Glassmorphism Card */}
                <div className="relative backdrop-blur-2xl border glass hover:border-primary/50 transition-all duration-300 h-full flex flex-col premium-hover">
                  {/* Animated gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      member.color
                    } transition-opacity duration-500 ${
                      hoveredId === member.id ? "opacity-20" : "opacity-0"
                    }`}
                  />

                  {/* Subtle shine effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col z-10">
                    {/* Image Container with glass border */}
                    <div className="mb-6 overflow-hidden rounded-2xl transition-all duration-500 group-hover:scale-105">
                      <div className="relative w-full aspect-square rounded-2xl border-2 border-white/20 backdrop-blur-sm">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover rounded-2xl"
                        />
                        {/* Image overlay */}
                        <div className="absolute inset-0 bg-black/10 rounded-2xl transition-all duration-300 group-hover:bg-transparent" />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p
                        className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-3`}
                      >
                        {member.role}
                      </p>
                      <p className="text-sm text-purple-100/70 leading-relaxed mb-6">
                        {member.bio}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div
                      className={`flex gap-3 pt-6 border-t border-white/20 transition-all duration-500 ${
                        hoveredId === member.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={`mailto:${member.social.email}`}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://${member.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://twitter.com/${member.social.twitter.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                        title="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </motion.a>
                    </div>

                    {/* Animated bottom accent */}
                    <div
                      className={`h-1 bg-gradient-to-r ${
                        member.color
                      } rounded-full mt-6 transition-all duration-500 ${
                        hoveredId === member.id
                          ? "w-full opacity-100"
                          : "w-0 opacity-50"
                      }`}
                    />
                  </div>
                </div>

                {/* Outer glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
