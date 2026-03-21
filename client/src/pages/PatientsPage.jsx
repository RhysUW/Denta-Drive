import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { listPatients, createPatient } from '../services/patientService';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import PatientForm from '../components/patients/PatientForm';
import { formatDate, genderBadgeVariant } from '../utils/formatters';
import { useDebounce } from '../hooks/useDebounce';
import toast from 'react-hot-toast';

export default function PatientsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery({
    queryKey: ['patients', debouncedSearch, page],
    queryFn: () => listPatients({ search: debouncedSearch, page, limit: 20 }),
  });

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setAddOpen(false);
      toast.success('Patient added');
    },
    onError: (err) => toast.error(err.response?.data?.error || 'Failed to add patient'),
  });

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const patients = data?.patients || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 text-sm mt-0.5">{total} total records</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setAddOpen(true)}>
          Add Patient
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or ID..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">
              {search ? 'No patients found matching your search.' : 'No patients yet. Add your first patient.'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Temp Number', 'Name', 'Age', 'Gender', 'Contact', 'Added'].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/patients/${p.id}`)}
                  className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors last:border-0"
                >
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {p.temp_number?.replace('PT-', '')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-gray-900">{p.name}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{p.age ?? '—'}</td>
                  <td className="px-5 py-4">
                    {p.gender ? (
                      <Badge variant={genderBadgeVariant(p.gender)}>{p.gender}</Badge>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{p.contact || '—'}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{formatDate(p.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)} icon={<ChevronLeft size={14} />}>
              Prev
            </Button>
            <Button variant="secondary" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Next <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New Patient" size="lg">
        <PatientForm
          onSubmit={(data) => createMutation.mutate(data)}
          onCancel={() => setAddOpen(false)}
          loading={createMutation.isPending}
        />
      </Modal>
    </div>
  );
}
