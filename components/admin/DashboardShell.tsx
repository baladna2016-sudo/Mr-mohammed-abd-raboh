'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, GraduationCap, Sparkles, FolderGit2, Target,
  MessageSquare, Settings, LogOut, Home, Menu, X, Eye, EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/admin/AuthProvider';

export type AdminTab = {
  id: string;
  label: string;
  icon: ReactNode;
};

const tabs: AdminTab[] = [
  { id: 'overview', label: 'نظرة عامة', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'hero', label: 'القسم الرئيسي', icon: <Home className="w-5 h-5" /> },
  { id: 'qualifications', label: 'المؤهلات', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'skills', label: 'المهارات', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'projects', label: 'المشروعات', icon: <FolderGit2 className="w-5 h-5" /> },
  { id: 'vision', label: 'الرؤية والأهداف', icon: <Target className="w-5 h-5" /> },
  { id: 'messages', label: 'الرسائل', icon: <MessageSquare className="w-5 h-5" /> },
];

type DashboardShellProps = {
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
  unreadCount?: number;
};

export default function DashboardShell({
  activeTab,
  onTabChange,
  children,
  unreadCount = 0,
}: DashboardShellProps) {
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 right-0 z-40 h-screen w-72 bg-card border-l border-border flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-cairo font-bold text-sm text-foreground">لوحة التحكم</h1>
              <p className="text-xs text-muted-foreground">إدارة المحتوى</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                setSidebarOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-right',
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-primary to-accent text-white shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {tab.icon}
              <span className="flex-1">{tab.label}</span>
              {tab.id === 'messages' && unreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Link
            href="/admin/settings"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            <Settings className="w-5 h-5" />
            الإعدادات
          </Link>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            <Home className="w-5 h-5" />
            عرض الموقع
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Overlay on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 glass border-b border-border px-4 py-3 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-secondary text-foreground"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-cairo font-bold text-sm text-foreground">لوحة التحكم</span>
          <Link href="/admin/settings" className="p-2 rounded-lg hover:bg-secondary text-foreground">
            <Settings className="w-5 h-5" />
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
