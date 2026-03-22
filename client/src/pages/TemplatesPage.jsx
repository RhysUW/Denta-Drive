import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Search } from 'lucide-react';
import { listTemplates } from '../services/templateService';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import TemplateModal from '../components/templates/TemplateModal';
import { formatDate } from '../utils/formatters';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({ open: false, template: null });
  const [search, setSearch] = useState('');

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: listTemplates,
  });

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-500 text-sm mt-0.5">Store and manage your document templates</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setModalState({ open: true, template: null })}>
          Add Template
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <FileText size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-700 font-medium">
            {search ? 'No templates match your search' : 'No templates yet'}
          </p>
          {!search && (
            <p className="text-gray-400 text-sm mt-1">Add your first template to get started</p>
          )}
          {!search && (
            <Button
              className="mt-4"
              icon={<Plus size={16} />}
              onClick={() => setModalState({ open: true, template: null })}
            >
              Add Template
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/references/templates/${t.id}`)}
              className="flex items-center justify-between bg-white border border-brand-500 rounded-2xl px-5 py-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-brand-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-lg">{t.content}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 shrink-0 ml-4">{formatDate(t.created_at)}</p>
            </div>
          ))}
        </div>
      )}

      <TemplateModal
        open={modalState.open}
        onClose={() => setModalState({ open: false, template: null })}
        template={modalState.template}
      />
    </div>
  );
}