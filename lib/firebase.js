import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP5KxGQO5gVB_07cV4AqFgD4HrqjJzaso",
  authDomain: "mr-mohammed-abd-rabo.firebaseapp.com",
  projectId: "mr-mohammed-abd-rabo",
  storageBucket: "mr-mohammed-abd-rabo.firebasestorage.app",
  messagingSenderId: "48615661876",
  appId: "1:48615661876:web:99b968c0788896f7e7c561"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// دالة فورية لإدخال البيانات الرسمية بدقة
async function seedDatabaseForce() {
  try {
    const heroSnap = await getDocs(collection(db, "hero_settings"));
    if (heroSnap.empty) {
      await addDoc(collection(db, "hero_settings"), {
        name: "الأستاذ محمد عبدربه شقراني سليمان",
        title: "معلم تقنية رقمية | خبير دمج الذكاء الاصطناعي في التعليم وصيانة النظم",
        tagline: "معًا نصنع تعليميًا أفضل",
        bio: "معلم تقنية رقمية وخبير في دمج الذكاء الاصطناعي في التعليم وصيانة النظم.",
        avatar_url: ""
      });
    }

    const qualSnap = await getDocs(collection(db, "qualifications"));
    if (qualSnap.empty) {
      await addDoc(collection(db, "qualifications"), {
        title: "بكالوريوس حاسب آلي وإدارة أعمال",
        degree: "بكالوريوس",
        department: "شعبة نظم معلومات إدارية",
        field: "تقنية المعلومات",
        display_order: 1
      });
    }

    const skillsSnap = await getDocs(collection(db, "skills"));
    if (skillsSnap.empty) {
      const skillsList = [
        { title: "دمج الذكاء الاصطناعي في التعليم", category: "مهارات تقنية", icon_name: "Brain", display_order: 1 },
        { title: "إعداد المحتوى التعليمي الرقمي", category: "تطوير المحتوى", icon_name: "FileText", display_order: 2 },
        { title: "صيانة الحاسب الآلي", category: "صيانة ونظم", icon_name: "Cpu", display_order: 3 },
        { title: "الشبكات", category: "صيانة ونظم", icon_name: "Network", display_order: 4 },
        { title: "صيانة كاميرات المراقبة", category: "صيانة ونظم", icon_name: "Video", display_order: 5 }
      ];
      for (const skill of skillsList) {
        await addDoc(collection(db, "skills"), skill);
      }
    }

    const projSnap = await getDocs(collection(db, "projects"));
    if (projSnap.empty) {
      const projectsList = [
        { title: "تطبيق تعليمي أندرويد لتقنية رقمية (منصة تعليمية)", description: "تطبيق تفاعلي مخصص لدعم التعليم الرقمي.", category: "مشروعات برمجية", project_url: "", image_url: "", display_order: 1 },
        { title: "إعداد ملخصات وأوراق عمل واختبارات قصيرة", description: "أدوات تعليمية مساعدة لتحسين جودة التحصيل الدراسي.", category: "أدوات تعليمية", project_url: "", image_url: "", display_order: 2 },
        { title: "تطوير محتوى تعليمي تفاعلي ومبتكر", description: "محتوى رقمي يدمج الوسائط المتعددة لتعزيز التفاعل.", category: "تطوير المحتوى", project_url: "", image_url: "", display_order: 3 }
      ];
      for (const project of projectsList) {
        await addDoc(collection(db, "projects"), project);
      }
    }

    const visionSnap = await getDocs(collection(db, "vision_goals"));
    if (visionSnap.empty) {
      await addDoc(collection(db, "vision_goals"), {
        goal_statement: "استخدام التكنولوجيا والذكاء الاصطناعي لجعل التعلم أكثر تفاعلاً ووضوحًا.",
        keywords_array: ["تعليم رقمي", "ابتكار", "مهارات تقنية"],
        display_order: 1
      });
    }
  } catch (e) {
    console.error("Seeding error: ", e);
  }
}

seedDatabaseForce();

export { app, auth, db };