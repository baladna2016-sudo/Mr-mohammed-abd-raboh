'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import SectionHeading from './SectionHeading';

type Skill = {
  id: string;
  title: string;
  category?: string;
  icon_name?: string;
};

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="مجالات التميز"
          title="المهارات والخبرات"
          subtitle="خبرات متنوعة تجمع بين التعليم الرقمي والتقنية والصيانة"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {skills.map((skill, idx) => {
            const Icon = (Icons[skill.icon_name as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all" />

                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {skill.category}
                    </span>
                    <h3 className="font-cairo text-base font-bold mt-2 text-foreground leading-snug">
                      {skill.title}
                    </h3>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-l from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}