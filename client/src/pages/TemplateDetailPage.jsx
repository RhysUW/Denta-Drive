import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { getTemplate } from '../services/templateService';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import TemplateModal from '../components/templates/TemplateModal';
import { formatDate } from '../utils/formatters';

export default function TemplateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

  const { data: template, isLoading } = useQuery({
    queryKey: ['template', id],
    queryFn: () => getTemplate(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!template) {
    return <div className="p-8 text-center text-gray-400">Template not found.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/references/templates')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Templates
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
          <p className="text-xs text-gray-400 mt-1">
            Created {formatDate(template.created_at)}
            {template.updated_at !== template.created_at && ` · Updated ${formatDate(template.updated_at)}`}
          </p>
        </div>
        <Button variant="secondary" size="sm" icon={<Edit2 size={14} />} onClick={() => setEditOpen(true)}>
          Edit
        </Button>
      </div>

      {/* Content */}
      <div className="bg-white border border-brand-500 rounded-2xl shadow-sm p-6">
        <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
          {template.content}
        </pre>
      </div>

      <TemplateModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          queryClient.invalidateQueries({ queryKey: ['template', id] });
        }}
        template={template}
        onDeleted={() => navigate('/references/templates')}
      />
    </div>
  );
}