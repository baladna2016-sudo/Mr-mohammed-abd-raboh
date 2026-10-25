'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, Home } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/components/admin/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // إذا كان المستخدم مسجل دخوله بالفعل، نقله للوحة التحكم
  if (!loading && user) {
    router.replace('/admin/dashboard');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast({ title: 'تم تسجيل الدخول بنجاح' });
      router.replace('/admin/dashboard');
    } catch (err) {
      toast({
        title: 'فشل تسجيل الدخول',
        description: 'تحقق من البريد الإلكتروني وكلمة المرور.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="glass rounded-2xl shadow-2xl border border-white/15 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent items-center justify-center mb-4 shadow-lg shadow-primary/30">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-cairo text-2xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground mt-1">تسجيل الدخول للمشرف</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  placeholder="admin@example.com"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-l from-primary to-accent text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> جاري الدخول...</>
              ) : (
                <>دخول <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/60 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              العودة للموقع
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}