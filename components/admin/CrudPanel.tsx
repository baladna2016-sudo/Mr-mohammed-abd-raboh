'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, Save, Loader2 } from 'lucide-react';

export type CrudColumn = {
  key: string;
  label: string;
};

export type CrudField = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'number';
  required?: boolean;
};

type CrudPanelProps = {
  title: string;
  description?: string;
  columns: CrudColumn[];
  fields: CrudField[];
  rows: Record<string, unknown>[];
  loading?: boolean;
  onSave: (data: Record<string, unknown>, id?: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function CrudPanel({ title, description, columns, fields, rows, loading, onSave, onDelete }: CrudPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditingRow(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const openEdit = (row: Record<string, unknown>) => {
    setEditingRow(row);
    setFormData(row);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData, editingRow?.id as string | undefined);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-cairo text-xl font-bold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          <Plus className="w-4 h-4" />
          إضافة
        </button>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="text-right px-4 py-3 font-semibold">{col.label}</th>
                ))}
                <th className="text-right px-4 py-3 font-semibold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id as string} className="border-t border-border hover:bg-secondary/30">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 truncate max-w-">{row[col.key] as string}</td>
                  ))}
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(row)} className="p-1.5 rounded hover:bg-primary/10 text-primary"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(row.id as string)} className="p-1.5 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={columns.length + 1} className="text-center py-10 text-muted-foreground">لا يوجد بيانات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl border border-border w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">{editingRow ? 'تعديل' : 'إضافة جديد'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded hover:bg-secondary"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-1.5">{field.label} {field.required && <span className="text-destructive">*</span>}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      value={(formData[field.key] as string) || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary/40"
                    />
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      required={field.required}
                      value={(formData[field.key] as string) || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary/40"
                    />
                  )}
                </div>
              ))}
              <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-60">
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                حفظ
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}