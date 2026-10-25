'use client';

import { useState, useEffect } from 'react';
import CrudPanel, { type CrudColumn } from '@/components/admin/CrudPanel';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function MyAdminPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const collectionName = 'items'; 

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

  const handleSave = async (data: any, id?: string) => {
    if (id) {
      await updateDoc(doc(db, collectionName, id), data as any);
    } else {
      await addDoc(collection(db, collectionName), data as any);
    }
    await fetchRows();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
    await fetchRows();
  };

  const columns: CrudColumn[] = [
    { key: 'title', label: 'العنوان' },
    { key: 'description', label: 'الوصف' },
  ];

  const fields = [
    { key: 'title', label: 'العنوان', type: 'text' as const, required: true },
    { key: 'description', label: 'الوصف', type: 'textarea' as const },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <CrudPanel
        title="إدارة العناصر"
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