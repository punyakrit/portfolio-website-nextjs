"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Calendar, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black" />
      
      <main className="relative container mx-auto max-w-5xl px-6 sm:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
              Get in Touch
            </h1>
            <div className="h-1 w-20 bg-white/20" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <p className="text-lg text-white/60 leading-relaxed">
                Looking for full-time engineering roles at product-focused companies. 
                Interested in working on challenging problems and growing my skills.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:punyakrit@example.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-zinc-900 border border-white/10 rounded-lg group-hover:bg-zinc-800 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">punyakrit@example.com</span>
                </a>

                <a
                  href="https://github.com/punyakrit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-zinc-900 border border-white/10 rounded-lg group-hover:bg-zinc-800 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <span className="text-sm">github.com/punyakrit</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/punyakrit-singh-makhni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-zinc-900 border border-white/10 rounded-lg group-hover:bg-zinc-800 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">LinkedIn Profile</span>
                </a>

                <a
                  href="https://cal.com/punyakrit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-zinc-900 border border-white/10 rounded-lg group-hover:bg-zinc-800 transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Schedule a Call</span>
                </a>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm mb-1">Remote</p>
                    <p className="text-xs text-white/40">Open to remote-first or hybrid opportunities</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="p-8 bg-zinc-900/30 border border-white/10 rounded-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Quick Message</h2>
                
                <form className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-white/90 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
