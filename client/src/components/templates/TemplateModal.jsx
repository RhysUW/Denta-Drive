import { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadCloud, FileText, X } from 'lucide-react';
import mammoth from 'mammoth';
import { createTemplate, updateTemplate, deleteTemplate } from '../../services/templateService';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TemplateModal({ open, onClose, template = null }) {
  const queryClient = useQueryClient();
  const isEdit = !!template;
  const [tab, setTab] = useState('text');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [nameError, setNameError] = useState('');
  const [contentError, setContentError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName(template?.name || '');
      setContent(template?.content || '');
      setFileName('');
      setNameError('');
      setContentError('');
      setTab('text');
    }
  }, [open, template]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['templates'] });

  const createMut = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => { invalidate(); onClose(); toast.success('Template created'); },
    onError: () => toast.error('Failed to create template'),
  });

  const updateMut = useMutation({
    mutationFn: (data) => updateTemplate(template.id, data),
    onSuccess: () => { invalidate(); onClose(); toast.success('Template updated'); },
    onError: () => toast.error('Failed to update template'),
  });

  const deleteMut = useMutation({
    mutationFn: () => deleteTemplate(template.id),
    onSuccess: () => { invalidate(); onClose(); toast.success('Template deleted'); },
    onError: () => toast.error('Failed to delete template'),
  });

  const parseDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    setContent(result.value);
    setFileName(file.name);
    if (!name) setName(file.name.replace(/\.docx$/i, ''));
    setTab('text');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0] || e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.docx')) {
      toast.error('Only .docx files are supported');
      return;
    }
    parseDocx(file);
  };

  const validate = () => {
    let valid = true;
    if (!name.trim()) { setNameError('Name is required'); valid = false; } else setNameError('');
    if (!content.trim()) { setContentError('Content is required'); valid = false; } else setContentError('');
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload = { name: name.trim(), content: content.trim() };
    if (isEdit) updateMut.mutate(payload);
    else createMut.mutate(payload);
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Template' : 'New Template'} size="lg">
      <div className="space-y-4">
        {/* Name */}
        <Input
          label="Template Name *"
          placeholder="e.g. Post-Extraction Instructions"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
        />

        {/* Tab toggle */}
        <div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-3">
            <button
              type="button"
              onClick={() => setTab('upload')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === 'upload' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Upload .docx
            </button>
            <button
              type="button"
              onClick={() => setTab('text')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === 'text' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Type / Paste
            </button>
          </div>

          {tab === 'upload' ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragging ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-400 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                className="hidden"
                onChange={handleFileDrop}
              />
              <UploadCloud size={32} className="text-gray-300 mb-3" />
              {fileName ? (
                <div className="flex items-center gap-2 text-sm text-brand-600 font-medium">
                  <FileText size={16} />
                  {fileName}
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-600">Drop a .docx file here</p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse</p>
                </>
              )}
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type or paste your template content here..."
                rows={12}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-y font-mono ${
                  contentError ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {contentError && <p className="text-xs text-red-500 mt-1">{contentError}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {isEdit ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon={<Trash2 size={14} />}
              loading={deleteMut.isPending}
              onClick={() => deleteMut.mutate()}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Delete
            </Button>
          ) : <div />}
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button
              type="button"
              loading={createMut.isPending || updateMut.isPending}
              onClick={handleSubmit}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}