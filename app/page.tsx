import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Qualifications from '@/components/site/Qualifications';
import Skills from '@/components/site/Skills';
import Projects from '@/components/site/Projects';
import Vision from '@/components/site/Vision';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';

// تعريف الأنواع (Types) المستخدمة في الصفحة
export type HeroSettings = { id?: string; name?: string; title?: string; tagline?: string; avatar_url?: string; bio?: string };
export type Qualification = { id: string; title: string; degree?: string; department?: string; description?: string; display_order?: number };
export type Skill = { id: string; title: string; category?: string; icon_name?: string; display_order?: number };
export type Project = { id: string; title: string; description?: string; category?: string; project_url?: string; image_url?: string; display_order?: number };
export type VisionGoal = { id: string; goal_statement: string; keywords_array?: string[]; display_order?: number };

export const revalidate = 60;

export default async function Home() {
  let hero: HeroSettings | null = null;
  let qualifications: Qualification[] = [];
  let skills: Skill[] = [];
  let projects: Project[] = [];
  let vision: VisionGoal[] = [];

  try {
    // 1. جلب بيانات القسم الرئيسي (Hero)
    const heroSnapshot = await getDocs(collection(db, 'hero_settings'));
    if (!heroSnapshot.empty) {
      hero = { id: heroSnapshot.docs[0].id, ...heroSnapshot.docs[0].data() } as HeroSettings;
    }

    // 2. جلب المؤهلات مرتبة حسب display_order
    const qualQuery = query(collection(db, 'qualifications'), orderBy('display_order', 'asc'));
    const qualSnapshot = await getDocs(qualQuery);
    qualifications = qualSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Qualification[];

    // 3. جلب المهارات
    const skillsQuery = query(collection(db, 'skills'), orderBy('display_order', 'asc'));
    const skillsSnapshot = await getDocs(skillsQuery);
    skills = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Skill[];

    // 4. جلب المشروعات
    const projectsQuery = query(collection(db, 'projects'), orderBy('display_order', 'asc'));
    const projectsSnapshot = await getDocs(projectsQuery);
    projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];

    // 5. جلب والرؤية والأهداف
    const visionQuery = query(collection(db, 'vision_goals'), orderBy('display_order', 'asc'));
    const visionSnapshot = await getDocs(visionQuery);
    vision = visionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VisionGoal[];

  } catch (error) {
    console.error("Error loading home page data from Firestore:", error);
  }

  return (
    <>
      <Header />
      <main>
        <Hero hero={hero} />
        <Qualifications items={qualifications} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Vision items={vision} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}