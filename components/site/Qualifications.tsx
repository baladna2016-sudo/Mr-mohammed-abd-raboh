'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function Qualifications({ items }: { items: Qualification[] }) {
  return (
    <section id="qualifications" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="المسيرة المهنية والأكاديمية"
          title="المؤهلات والخبرات"
          subtitle="خلفية أكاديمية ومهنية متميزة في التقنية الرقمية والذكاء الاصطناعي"
        />

        <div className="relative mt-14">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 right-4 md:right-1/2 md:translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-8">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute right-4 md:right-1/2 top-6 md:translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent ring-4 ring-background shadow-lg z-10" />

                {/* Card */}
                <div className="md:w-1/2 pr-12 md:pr-0 md:px-8">
                  <div className="group p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                        {idx % 2 === 0 ? <GraduationCap className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.degree}
                        </span>
                        <h3 className="font-cairo text-lg font-bold mt-2 text-foreground">
                          {item.title}
                        </h3>
                        {item.department && (
                          <p className="text-sm text-muted-foreground mt-0.5">{item.department}</p>
                        )}
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
