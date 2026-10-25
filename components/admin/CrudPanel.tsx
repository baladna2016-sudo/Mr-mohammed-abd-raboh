'use client';

import { useState, useEffect } from 'react';
import CrudPanel, { type CrudColumn } from '@/components/admin/CrudPanel';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function MyAdminPage() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  // اسم الـ Collection في قاعدة بيانات Firestore
  const collectionName = 'items'; 

  // جلب البيانات من Firestore
  const fetchRows = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setRows(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  // دالة الحفظ (إضافة أو تعديل)
  const handleSave = async (data: Record<string, unknown>, id?: string) => {
    if (id) {
      // تعديل عنصر موجود
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
    } else {
      // إضافة عنصر جديد
      await addDoc(collection(db, collectionName), data);
    }
    await fetchRows(); // إعادة جلب البيانات لتحديث الجدول
  };

  // دالة الحذف
  const handleDelete = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    await fetchRows();
  };

  // تعريف أعمدة الجدول
  const columns: CrudColumn[] = [
    { key: 'title', label: 'العنوان' },
    { key: 'description', label: 'الوصف' },
  ];

  // تعريف الحقول اللي هتظهر في نافذة الإضافة/التعديل (Modal)
  const fields = [
    { key: 'title', label: 'العنوان', type: 'text' as const, required: true },
    { key: 'description', label: 'الوصف', type: 'textarea' as const },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <CrudPanel
        title="إدارة العناصر"
        description="يمكنك إضافة، تعديل، أو حذف العناصر من هنا مباشرة."
        columns={columns}
        fields={fields}
        rows={rows}
        loading={loading}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}