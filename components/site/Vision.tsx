'use client';

import { motion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';

type VisionGoal = {
  goal_statement: string;
  keywords_array?: string[];
};

export default function Vision({ items }: { items: VisionGoal[] }) {
  if (!items || items.length === 0) return null;
  const vision = items[0];

  return (
    <section id="vision" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/90 to-accent/80" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm items-center justify-center mb-6 border border-white/20">
            <Target className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-cairo text-3xl md:text-4xl font-bold text-white mb-6">
            الرؤية والأهداف
          </h2>

          <blockquote className="relative font-cairo text-xl md:text-2xl font-medium text-white leading-relaxed max-w-3xl mx-auto">
            <span className="text-5xl text-white/20 absolute -top-4 -right-2 leading-none">&quot;</span>
            {vision.goal_statement}
          </blockquote>

          {vision.keywords_array && vision.keywords_array.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {vision.keywords_array.map((kw, idx) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white font-medium text-sm hover:bg-white/25 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  {kw}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}