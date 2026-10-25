'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, User, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useToast } from '@/hooks/use-toast';

const CONTACT_PHONE = '966569211498';

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    sender_name: '',
    email: '',
    phone: '',
    message_text: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sender_name.trim() || !form.message_text.trim()) {
      toast({
        title: 'الرجاء تعبئة الحقول المطلوبة',
        description: 'الاسم والرسالة مطلوبة.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);

    // تجهيز رسالة الواتساب
    const whatsappMessage = `مرحبا، لدي رسالة من موقعك:

*الاسم:* ${form.sender_name.trim()}
*البريد:* ${form.email.trim() || 'لم يذكر'}
*الهاتف:* ${form.phone.trim() || 'لم يذكر'}

*الرسالة:*
${form.message_text.trim()}`;

    const whatsappUrl = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

    // فتح الواتساب
    window.open(whatsappUrl, '_blank');

    setSent(true);
    setForm({ sender_name: '', email: '', phone: '', message_text: '' });
    toast({
      title: 'تم فتح الواتساب',
      description: 'سيتم إرسال رسالتك عبر الواتساب مباشرة.',
    });
    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="تواصل معي"
          title="أرسل رسالة"
          subtitle="يسعدني التواصل معكم للتعاون والإجابة على استفساراتكم"
        />

        <div className="grid lg:grid-cols-5 gap-8 mt-14">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <h3 className="font-cairo text-xl font-bold text-foreground">
                معاً نصنع تعليماً أفضل
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                سواء كنت معلماً أو طالباً أو مؤسسة تعليمية، يسعدني التعاون في مجالات
                التعليم الرقمي والذكاء الاصطناعي.
              </p>
              <a
                href={`https://wa.me/${CONTACT_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                واتساب: {CONTACT_PHONE}
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                  <a href="mailto:info@shqrani.edu" dir="ltr" className="text-sm font-medium text-foreground hover:text-primary transition-colors">info@shqrani.edu</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">الواتساب</p>
                  <a href={`https://wa.me/${CONTACT_PHONE}`} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-sm font-medium text-foreground hover:text-green-600 transition-colors">{CONTACT_PHONE}</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/60 shadow-sm">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="font-cairo text-xl font-bold text-foreground">تم فتح الواتساب</h3>
                  <p className="text-sm text-muted-foreground mt-2">تم تجهيز رسالتك في الواتساب، فقط اضغط إرسال هناك.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        الاسم <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          name="sender_name"
                          value={form.sender_name}
                          onChange={handleChange}
                          required
                          className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                          placeholder="اسمك الكريم"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        رقم الهاتف
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                          placeholder="رقمك للتواصل"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      الرسالة <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        name="message_text"
                        value={form.message_text}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-l from-green-600 to-green-500 text-white font-semibold shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        جاري التحويل...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        إرسال عبر الواتساب
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-muted-foreground">
                    سيتم فتح الواتساب مباشرة على الرقم {CONTACT_PHONE}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}