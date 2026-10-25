'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/components/admin/AuthProvider';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{children}</motion.div>;
}
