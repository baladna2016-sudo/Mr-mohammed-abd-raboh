'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, FolderGit2, Target, MessageSquare, Mail, Eye } from 'lucide-react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import DashboardShell from '@/components/admin/DashboardShell';
import CrudPanel, { type CrudColumn } from '@/components/admin/CrudPanel';
import HeroEditor from '@/components/admin/HeroEditor';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

// تعريف الأنواع (Types) بناءً على بياناتك
export type HeroSettings = { id?: string; name?: string; title?: string; tagline?: string; avatar_url?: string; bio?: string; updated_at?: string };
export type Qualification = { id: string; title: string; degree?: string; department?: string; description?: string; display_order?: number };
export type Skill = { id: string; title: string; category?: string; icon_name?: string; display_order?: number };
export type Project = { id: string; title: string; description?: string; category?: string; project_url?: string; image_url?: string; display_order?: number };
export type VisionGoal = { id: string; goal_statement: string; keywords_array?: string[]; display_order?: number };
export type Message = { id: string; sender_name: string; email?: string; phone?: string; message_text: string; created_at: string; is_read: boolean };

function DashboardContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [visionGoals, setVisionGoals] = useState<VisionGoal[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // جلب كافة البيانات من Firestore
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Hero Settings
      const heroSnapshot = await getDocs(collection(db, 'hero_settings'));
      if (!heroSnapshot.empty) {
        const heroData = { id: heroSnapshot.docs[0].id, ...heroSnapshot.docs[0].data() } as HeroSettings;
        setHero(heroData);
      } else {
        setHero(null);
      }

      // 2. Qualifications
      const qualQuery = query(collection(db, 'qualifications'), orderBy('display_order', 'asc'));
      const qualSnapshot = await getDocs(qualQuery);
      setQualifications(qualSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Qualification[]);

      // 3. Skills
      const skillsQuery = query(collection(db, 'skills'), orderBy('display_order', 'asc'));
      const skillsSnapshot = await getDocs(skillsQuery);
      setSkills(skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Skill[]);

      // 4. Projects
      const projectsQuery = query(collection(db, 'projects'), orderBy('display_order', 'asc'));
      const projectsSnapshot = await getDocs(projectsQuery);
      setProjects(projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[]);

      // 5. Vision Goals
      const visionQuery = query(collection(db, 'vision_goals'), orderBy('display_order', 'asc'));
      const visionSnapshot = await getDocs(visionQuery);
      setVisionGoals(visionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VisionGoal[]);

      // 6. Messages
      const msgQuery = query(collection(db, 'messages'), orderBy('created_at', 'desc'));
      const msgSnapshot = await getDocs(msgQuery);
      setMessages(msgSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[]);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const unreadCount = messages.filter((m) => !m.is_read).length;

  // دوال الحفظ والحذف للمؤهلات
  const handleSaveQualifications = async (data: Record<string, unknown>, id?: string) => {
    if (id) {
      await updateDoc(doc(db, 'qualifications', id), data);
      toast({ title: 'تم تحديث المؤهل' });
    } else {
      await addDoc(collection(db, 'qualifications'), data);
      toast({ title: 'تمت إضافة المؤهل' });
    }
    fetchAll();
  };

  const handleDeleteQualification = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'qualifications', id));
      toast({ title: 'تم حذف المؤهل' });
      fetchAll();
    } catch {
      toast({ title: 'فشل الحذف', variant: 'destructive' });
    }
  };

  // دوال الحفظ والحذف للمهارات
  const handleSaveSkills = async (data: Record<string, unknown>, id?: string) => {
    if (id) {
      await updateDoc(doc(db, 'skills', id), data);
      toast({ title: 'تم تحديث المهارة' });
    } else {
      await addDoc(collection(db, 'skills'), data);
      toast({ title: 'تمت إضافة المهارة' });
    }
    fetchAll();
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'skills', id));
      toast({ title: 'تم حذف المهارة' });
      fetchAll();
    } catch {
      toast({ title: 'فشل الحذف', variant: 'destructive' });
    }
  };

  // دوال الحفظ والحذف للمشروعات
  const handleSaveProjects = async (data: Record<string, unknown>, id?: string) => {
    if (id) {
      await updateDoc(doc(db, 'projects', id), data);
      toast({ title: 'تم تحديث المشروع' });
    } else {
      await addDoc(collection(db, 'projects'), data);
      toast({ title: 'تمت إضافة المشروع' });
    }
    fetchAll();
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast({ title: 'تم حذف المشروع' });
      fetchAll();
    } catch {
      toast({ title: 'فشل الحذف', variant: 'destructive' });
    }
  };

  // دوال الرؤية والأهداف
  const handleSaveVision = async (data: Record<string, unknown>, id?: string) => {
    if (id) {
      await updateDoc(doc(db, 'vision_goals', id), data);
      toast({ title: 'تم تحديث الرؤية' });
    } else {
      await addDoc(collection(db, 'vision_goals'), data);
      toast({ title: 'تمت إضافة الرؤية' });
    }
    fetchAll();
  };

  const handleDeleteVision = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'vision_goals', id));
      toast({ title: 'تم حذف الرؤية' });
      fetchAll();
    } catch {
      toast({ title: 'فشل الحذف', variant: 'destructive' });
    }
  };

  // دوال الرسائل
  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      toast({ title: 'تم حذف الرسالة' });
      fetchAll();
    } catch {
      toast({ title: 'فشل الحذف', variant: 'destructive' });
    }
  };

  const handleToggleRead = async (msg: Message) => {
    try {
      await updateDoc(doc(db, 'messages', msg.id), { is_read: !msg.is_read });
      fetchAll();
    } catch {
      toast({ title: 'فشل التحديث', variant: 'destructive' });
    }
  };

  const qualColumns: CrudColumn[] = [
    { key: 'title', label: 'العنوان' },
    { key: 'degree', label: 'الدرجة' },
    { key: 'department', label: 'القسم' },
    { key: 'display_order', label: 'الترتيب' },
  ];

  const skillColumns: CrudColumn[] = [
    { key: 'title', label: 'المهارة' },
    { key: 'category', label: 'التصنيف' },
    { key: 'icon_name', label: 'الأيقونة' },
    { key: 'display_order', label: 'الترتيب' },
  ];

  const projectColumns: CrudColumn[] = [
    { key: 'title', label: 'العنوان' },
    { key: 'category', label: 'التصنيف' },
    { key: 'display_order', label: 'الترتيب' },
  ];

  const visionColumns: CrudColumn[] = [
    { key: 'goal_statement', label: 'البيان' },
    { key: 'keywords_array', label: 'الكلمات', render: (row) => (
      <span className="text-xs">{(row.keywords_array as string[])?.join(' • ')}</span>
    ) },
  ];

  const renderOverview = () => {
    const stats = [
      { label: 'المؤهلات', count: qualifications.length, icon: <GraduationCap className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
      { label: 'المهارات', count: skills.length, icon: <Sparkles className="w-6 h-6" />, color: 'from-cyan-500 to-teal-500' },
      { label: 'المشروعات', count: projects.length, icon: <FolderGit2 className="w-6 h-6" />, color: 'from-blue-600 to-blue-400' },
      { label: 'الرسائل', count: messages.length, icon: <Mail className="w-6 h-6" />, color: 'from-slate-600 to-slate-400', badge: unreadCount },
    ];
    return (
      <div>
        <h2 className="font-cairo text-xl font-bold text-foreground mb-1">نظرة عامة</h2>
        <p className="text-sm text-muted-foreground mb-6">ملخص محتوى الموقع والرسائل الواردة</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-5 rounded-2xl bg-card border border-border/60 shadow-sm overflow-hidden"
            >
              <div className={`absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-3`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.count}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              {stat.badge ? (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                  {stat.badge} جديدة
                </span>
              ) : null}
            </motion.div>
          ))}
        </div>

        {messages.length > 0 && (
          <div className="mt-8">
            <h3 className="font-cairo font-bold text-foreground mb-3">أحدث الرسائل</h3>
            <div className="space-y-2">
              {messages.slice(0, 5).map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setActiveTab('messages')}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border/60 hover:border-primary/30 transition-colors text-right"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{msg.sender_name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{msg.message_text}</p>
                    </div>
                  </div>
                  {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardShell activeTab={activeTab} onTabChange={setActiveTab} unreadCount={unreadCount}>
      {activeTab === 'overview' && renderOverview()}

      {activeTab === 'hero' && (
        <HeroEditor hero={hero} loading={loading} onSaved={fetchAll} />
      )}

      {activeTab === 'qualifications' && (
        <CrudPanel
          title="المؤهلات"
          description="إدارة المؤهلات الأكاديمية والمهنية"
          columns={qualColumns}
          fields={[
            { key: 'title', label: 'العنوان', type: 'text', required: true },
            { key: 'degree', label: 'الدرجة العلمية', type: 'text' },
            { key: 'department', label: 'القسم/التخصص', type: 'text' },
            { key: 'description', label: 'الوصف', type: 'textarea' },
            { key: 'display_order', label: 'ترتيب العرض', type: 'number' },
          ]}
          rows={qualifications as unknown as Record<string, unknown>[]}
          loading={loading}
          onSave={handleSaveQualifications}
          onDelete={handleDeleteQualification}
        />
      )}

      {activeTab === 'skills' && (
        <CrudPanel
          title="المهارات"
          description="إدارة شبكة المهارات والخبرات"
          columns={skillColumns}
          fields={[
            { key: 'title', label: 'المهارة', type: 'text', required: true },
            { key: 'category', label: 'التصنيف', type: 'text' },
            { key: 'icon_name', label: 'اسم الأيقونة (Lucide)', type: 'text', placeholder: 'BrainCircuit', dir: 'ltr' },
            { key: 'display_order', label: 'ترتيب العرض', type: 'number' },
          ]}
          rows={skills as unknown as Record<string, unknown>[]}
          loading={loading}
          onSave={handleSaveSkills}
          onDelete={handleDeleteSkill}
        />
      )}

      {activeTab === 'projects' && (
        <CrudPanel
          title="المشروعات"
          description="إدارة المشروعات المميزة"
          columns={projectColumns}
          fields={[
            { key: 'title', label: 'العنوان', type: 'text', required: true },
            { key: 'description', label: 'الوصف', type: 'textarea' },
            { key: 'category', label: 'التصنيف', type: 'text' },
            { key: 'project_url', label: 'رابط المشروع', type: 'text', dir: 'ltr' },
            { key: 'image_url', label: 'رابط الصورة', type: 'text', dir: 'ltr' },
            { key: 'display_order', label: 'ترتيب العرض', type: 'number' },
          ]}
          rows={projects as unknown as Record<string, unknown>[]}
          loading={loading}
          onSave={handleSaveProjects}
          onDelete={handleDeleteProject}
        />
      )}

      {activeTab === 'vision' && (
        <CrudPanel
          title="الرؤية والأهداف"
          description="إدارة قسم الرؤية والكلمات المفتاحية"
          columns={visionColumns}
          fields={[
            { key: 'goal_statement', label: 'بيان الرؤية', type: 'textarea', required: true },
            { key: 'keywords_array', label: 'الكلمات المفتاحية (افصل بفاصلة)', type: 'array' },
            { key: 'display_order', label: 'ترتيب العرض', type: 'number' },
          ]}
          rows={visionGoals as unknown as Record<string, unknown>[]}
          loading={loading}
          onSave={handleSaveVision}
          onDelete={handleDeleteVision}
        />
      )}

      {activeTab === 'messages' && (
        <div>
          <h2 className="font-cairo text-xl font-bold text-foreground mb-1">الرسائل الواردة</h2>
          <p className="text-sm text-muted-foreground mb-6">الرسائل المرسلة عبر نموذج التواصل</p>
          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16 rounded-xl border-2 border-dashed border-border">
              <Mail className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">لا توجد رسائل</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-xl bg-card border transition-colors ${msg.is_read ? 'border-border/60' : 'border-primary/40 bg-primary/5'}`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-foreground">{msg.sender_name}</p>
                          {!msg.is_read && <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">جديد</span>}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                          {msg.email && <span>{msg.email}</span>}
                          {msg.phone && <span>{msg.phone}</span>}
                          <span>{msg.created_at ? new Date(msg.created_at).toLocaleString('ar-EG') : ''}</span>
                        </div>
                        <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{msg.message_text}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleRead(msg)}
                        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
                        title={msg.is_read ? 'وضع كغير مقروء' : 'وضع كمقروء'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardShell>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}