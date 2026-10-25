'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Save, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function HeroEditor({
  hero,
  loading,
  onSaved,
}: {
  hero: HeroSettings | null;
  loading: boolean;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(hero?.avatar_url ?? '');
  
  const [form, setForm] = useState({
    name: hero?.name ?? '',
    title: hero?.title ?? '',
    tagline: hero?.tagline ?? '',
    avatar_url: hero?.avatar_url ?? '',
    bio: hero?.bio ?? '',
  });

  // Sync when hero loads
  const currentKey = hero?.id ?? '';
  const [syncedKey, setSyncedKey] = useState('');
  if (currentKey && currentKey !== syncedKey) {
    setSyncedKey(currentKey);
    setForm({
      name: hero?.name ?? '',
      title: hero?.title ?? '',
      tagline: hero?.tagline ?? '',
      avatar_url: hero?.avatar_url ?? '',
      bio: hero?.bio ?? '',
    });
    setPreview(hero?.avatar_url ?? '');
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // تحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      toast({ title: 'يجب اختيار صورة فقط', variant: 'destructive' });
      return;
    }

    // معاينة فورية
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    setUploading(true);
    try {
      const storage = getStorage();
      const fileName = `avatars/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      
      setForm({ ...form, avatar_url: downloadUrl });
      toast({ title: 'تم رفع الصورة بنجاح' });
    } catch (error) {
      console.error(error);
      toast({ title: 'فشل رفع الصورة', description: 'تأكد من تفعيل Storage في Firebase', variant: 'destructive' });
      // fallback: استخدم base64 لو Storage مش مفعل
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setForm((prev) => ({ ...prev, avatar_url: base64 }));
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docId = hero?.id ?? 'main';
      const docRef = doc(db, 'hero_settings', docId);

      const payload = {
        ...form,
        updated_at: new Date().toISOString(),
      };

      if (hero?.id) {
        await updateDoc(docRef, payload);
      } else {
        await setDoc(docRef, payload);
      }

      toast({ title: 'تم حفظ القسم الرئيسي' });
      onSaved();
    } catch (error) {
      console.error(error);
      toast({ title: 'فشل الحفظ', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-cairo text-xl font-bold text-foreground mb-1">القسم الرئيسي</h2>
      <p className="text-sm text-muted-foreground mb-6">إدارة محتوى الواجهة الرئيسية للموقع</p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="space-y-5 max-w-2xl"
      >
        {/* معاينة + رفع */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <label className="block text-sm font-medium text-foreground mb-3">الصورة الرمزية</label>
          
          {preview ? (
            <div className="flex items-center gap-4 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="معاينة" className="w-20 h-20 rounded-full object-cover border-2 border-primary/30" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">معاينة الصورة</p>
                <p className="text-xs text-muted-foreground">تظهر بجانب العنوان في الواجهة</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPreview('');
                  setForm({ ...form, avatar_url: '' });
                }}
                className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted border-2 border-dashed border-border mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
            </div>
          )}

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الرفع...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  اختر صورة من الجهاز
                </>
              )}
            </label>
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG حتى 5MB</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">الاسم</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            placeholder="الاسم الكامل"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">العنوان المهني</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            placeholder="المسمى الوظيفي"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">الشعار / العبارة</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            placeholder="عبارة قصيرة"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">السيرة الذاتية</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
            placeholder="نبذة تعريفية"
          />
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-l from-primary to-accent text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          حفظ التغييرات
        </button>
      </motion.form>
    </div>
  );
}