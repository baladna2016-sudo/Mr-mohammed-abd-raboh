'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
        {eyebrow}
      </span>
      <h2 className="font-cairo text-3xl md:text-4xl font-bold mt-4 text-foreground">
        {title}
      </h2>
      <div className="w-20 h-1.5 rounded-full bg-gradient-to-l from-primary to-accent mx-auto mt-4" />
      {subtitle && (
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
