'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, FolderGit2, Tag } from 'lucide-react';
import SectionHeading from './SectionHeading';

type Project = {
  id: string | number;
  title: string;
  description: string;
  image_url?: string | null;
  category?: string | null;
  project_url?: string | null;
};

function getProjectImage(project: Project): string {
  if (project.image_url) return project.image_url;

  const searchText = `${project.title} ${project.category || ''} ${project.description}`.toLowerCase();

  if (searchText.includes('تطبيق تعليمي') || searchText.includes('أندرويد') || searchText.includes('منصة تعليمية') || searchText.includes('تقنية رقمية')) {
    return '/android-app.jpg';
  }
  if (searchText.includes('أدوات تعليمية') || searchText.includes('ملخصات') || searchText.includes('أوراق عمل') || searchText.includes('اختبارات')) {
    return '/edu-tools.jpg';
  }
  if (searchText.includes('تطوير المحتوى') || searchText.includes('محتوى تفاعلي') || searchText.includes('وسائط')) {
    return '/content-studio.jpg';
  }
  return '/android-app.jpg';
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="أبرز الأعمال"
          title="المشروعات المميزة"
          subtitle="مجموعة من المشروعات التعليمية والتقنية التي تعكس الرؤية والخبرة"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-secondary">
                <img
                  src={getProjectImage(project)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                {project.category && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-medium text-white bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    {project.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-cairo text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                {project.project_url && (
                  <Link
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:text-accent transition-colors"
                  >
                    زيارة المشروع
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}