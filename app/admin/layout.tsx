'use client';

import { type ReactNode } from 'react';
import { AuthProvider } from '@/components/admin/AuthProvider';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
