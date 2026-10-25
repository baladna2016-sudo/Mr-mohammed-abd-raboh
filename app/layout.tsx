import './globals.css';
import type { Metadata } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'الأستاذ محمد عبدربه شقراني سليمان | خبير التقنية الرقمية والذكاء الاصطناعي',
  description: 'الموقع الرسمي للأستاذ محمد عبدربه شقراني سليمان - معلم تقنية رقمية وخبير دمج الذكاء الاصطناعي في التعليم وصيانة النظم.',
  keywords: ['تعليم رقمي', 'ذكاء اصطناعي في التعليم', 'سلسلة التفوق الرقمية', 'صيانة حاسب', 'محمد عبدربه شقراني'],
  authors: [{ name: 'الأستاذ محمد عبدربه شقراني سليمان' }],
  openGraph: {
    title: 'الأستاذ محمد عبدربه شقراني سليمان',
    description: 'معلم تقنية رقمية | خبير دمج الذكاء الاصطناعي في التعليم وصيانة النظم',
    siteName: 'سلسلة التفوق الرقمية',
    locale: 'ar_EG',
    type: 'profile',
    images: [
      {
        url: '/WhatsApp_Image_2026-10-17_at_2.15.23_PM.jpeg',
        width: 1024,
        height: 1024,
        alt: 'الأستاذ محمد عبدربه شقراني سليمان',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الأستاذ محمد عبدربه شقراني سليمان',
    description: 'معلم تقنية رقمية | خبير دمج الذكاء الاصطناعي في التعليم وصيانة النظم',
    images: ['/WhatsApp_Image_2026-10-17_at_2.15.23_PM.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} ${tajawal.variable} font-tajawal antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
