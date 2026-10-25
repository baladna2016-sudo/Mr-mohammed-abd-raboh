'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#qualifications', label: 'المؤهلات' },
  { href: '#skills', label: 'المهارات' },
  { href: '#projects', label: 'المشروعات' },
  { href: '#vision', label: 'الرؤية' },
  { href: '#contact', label: 'تواصل' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-lg border-b border-border/40' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className={cn(
              'font-cairo font-bold text-sm md:text-base transition-colors',
              scrolled ? 'text-foreground' : 'text-white'
            )}>
              محمد شقراني
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-primary/10',
                  scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/80 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className={cn(
                'mr-2 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                scrolled
                  ? 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              )}
            >
              <Lock className="w-4 h-4" />
              دخول الإدارة
            </Link>
          </div>

          <button
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              scrolled ? 'text-foreground hover:bg-primary/10' : 'text-white hover:bg-white/10'
            )}
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass border-t border-border/40 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
              >
                <Lock className="w-4 h-4" />
                دخول الإدارة
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
