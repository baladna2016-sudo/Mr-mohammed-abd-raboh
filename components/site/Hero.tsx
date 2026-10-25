'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles, FolderGit2 } from 'lucide-react';


export default function Hero({ hero }: { hero: HeroSettings | null }) {
  const name = hero?.name || 'الأستاذ محمد عبدربه شقراني سليمان';
  const title = hero?.title || 'معلم تقنية رقمية | خبير دمج الذكاء الاصطناعي في التعليم وصيانة النظم';
  const tagline = hero?.tagline || 'معاً نصنع تعليماً أفضل';
  const bio = hero?.bio || '';
  const avatarUrl = hero?.avatar_url || '/WhatsApp_Image_2026-10-17_at_2.15.23_PM.jpeg';

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-hero-pattern pt-20">
      {/* Decorative grid + glow */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white space-y-6 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm text-white/90"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              {tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-cairo text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl"
            >
              {title}
            </motion.p>

            {bio && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base text-white/60 leading-relaxed max-w-xl"
              >
                {bio}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-l from-primary to-accent text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105"
              >
                تواصل معي
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/15 transition-all"
              >
                <FolderGit2 className="w-4 h-4" />
                تصفح المشروعات
              </Link>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring" style={{ animationDelay: '0s' }} />
              <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-pulse-ring" style={{ animationDelay: '1s' }} />

              {/* Glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 to-accent/30 blur-2xl" />

              {/* Avatar circle */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-2 -left-6 glass rounded-2xl px-4 py-2 shadow-xl border border-white/20"
              >
                <span className="text-sm font-cairo font-semibold text-foreground">AI + Education</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -right-6 glass rounded-2xl px-4 py-2 shadow-xl border border-white/20"
              >
                <span className="text-sm font-cairo font-semibold text-foreground">تقنية رقمية</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  );
}
