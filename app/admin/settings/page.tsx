'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Loader2, Save, ShieldCheck, Home } from 'lucide-react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useAuth } from '@/components/admin/AuthProvider';
import { auth } from '@/lib/firebase';
import { 
  updateEmail, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

function SettingsContent() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [newEmail, setNewEmail] = useState(user?.email ?? '');
  const [emailLoading, setEmailLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  // تحديث البريد الإلكتروني
  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !auth.currentUser) return;
    setEmailLoading(true);
    try {
      await updateEmail(auth.currentUser, newEmail.trim());
      toast({ title: 'تم تحديث البريد الإلكتروني', description: 'تم التحديث بنجاح.' });
    } catch (err) {
      toast({
        title: 'فشل تحديث البريد',
        description: err instanceof Error ? err.message : 'حدث خطأ، قد تتطلب هذه العملية تسجيل خروج ودخول من جديد للتحقق.',
        variant: 'destructive',
      });
    } finally {
      setEmailLoading(false);
    }
  };

  // تحديث كلمة المرور
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: 'كلمتا المرور غير متطابقتين', variant: 'destructive' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: 'كلمة المرور قصيرة', description: 'ستة أحرف على الأقل.', variant: 'destructive' });
      return;
    }
    setPwLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) throw new Error('المسؤول غير مسجل الدخول');

      // إعادة المصادقة باستخدام كلمة المرور الحالية للأمان
      if (currentPassword) {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
      }

      await updatePassword(currentUser, newPassword);
      toast({ title: 'تم تحديث كلمة المرور بنجاح' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast({
        title: 'فشل تحديث كلمة المرور',
        description: err instanceof Error ? err.message : 'تأكد من صحة كلمة المرور الحالية',
        variant: 'destructive',
      });
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-cairo text-xl font-bold text-foreground">إعدادات الأمان</h1>
              <p className="text-xs text-muted-foreground">تحديث البريد الإلكتروني وكلمة المرور</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للوحة
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Home className="w-4 h-4" />
              الموقع
            </Link>
          </div>
        </div>

        {/* Email card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm mb-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cairo font-bold text-foreground">البريد الإلكتروني</h2>
              <p className="text-xs text-muted-foreground">البريد الحالي: {user?.email}</p>
            </div>
          </div>
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">البريد الإلكتروني الجديد</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                placeholder="new@email.com"
              />
            </div>
            <button
              type="submit"
              disabled={emailLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {emailLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              تحديث البريد
            </button>
          </form>
        </motion.div>

        {/* Password card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cairo font-bold text-foreground">كلمة المرور</h2>
              <p className="text-xs text-muted-foreground">اختر كلمة مرور قوية (٦ أحرف على الأقل)</p>
            </div>
          </div>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">كلمة المرور الحالية</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                placeholder="••••••••"
              />
              <p className="text-xs text-muted-foreground mt-1">يُطلب إدخالها للتحقق من هويتك</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={pwLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-l from-primary to-accent text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
            >
              {pwLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              تحديث كلمة المرور
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}