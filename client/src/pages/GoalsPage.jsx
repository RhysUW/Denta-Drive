import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Target } from 'lucide-react';
import { listGoals, createGoal, updateGoal } from '../services/goalService';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import { currentSemester } from '../utils/formatters';
import toast from 'react-hot-toast';

const SEMESTER_OPTIONS = (() => {
  const opts = [];
  const now = new Date();
  for (let i = -1; i <= 3; i++) {
    const totalMonths = now.getMonth() + i * 6;
    const year = now.getFullYear() + Math.floor(totalMonths / 12);
    const sem = (((totalMonths % 12) + 12) % 12 < 6) ? 1 : 2;
    const val = `${year}-S${sem}`;
    if (!opts.includes(val)) opts.push(val);
  }
  return [...new Set(opts)];
})();

export default function GoalsPage() {
  const queryClient = useQueryClient();
  const [semester, setSemester] = useState(currentSemester());
  const [modalState, setModalState] = useState({ open: false, goal: null });

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['goals', semester],
    queryFn: () => listGoals({ semester }),
  });

  const createMut = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setModalState({ open: false, goal: null });
      toast.success('Goal created');
    },
    onError: () => toast.error('Failed to create goal'),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, ...data }) => updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setModalState({ open: false, goal: null });
      toast.success('Goal updated');
    },
    onError: () => toast.error('Failed to update goal'),
  });

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.current_count >= g.target_count).length;

  const handleSubmit = (data) => {
    if (modalState.goal) {
      updateMut.mutate({ id: modalState.goal.id, ...data });
    } else {
      createMut.mutate(data);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Track your clinical procedure targets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            {SEMESTER_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <Button icon={<Plus size={16} />} onClick={() => setModalState({ open: true, goal: null })}>
            Add Goal
          </Button>
        </div>
      </div>

      {/* Summary strip */}
      {totalGoals > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Goals" value={totalGoals} color="bg-brand-50 text-brand-600" />
          <StatCard label="Completed" value={completedGoals} color="bg-green-50 text-green-600" />
          <StatCard
            label="In Progress"
            value={totalGoals - completedGoals}
            color="bg-amber-50 text-amber-600"
          />
        </div>
      )}

      {/* Goals grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <Target size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-700 font-medium">No goals for {semester}</p>
          <p className="text-gray-400 text-sm mt-1">Add your first goal to start tracking progress</p>
          <Button
            className="mt-4"
            icon={<Plus size={16} />}
            onClick={() => setModalState({ open: true, goal: null })}
          >
            Add Goal
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={(g) => setModalState({ open: true, goal: g })}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Goal Modal */}
      <Modal
        open={modalState.open}
        onClose={() => setModalState({ open: false, goal: null })}
        title={modalState.goal ? 'Edit Goal' : 'New Goal'}
        size="sm"
      >
        <GoalForm
          defaultValues={modalState.goal || { semester }}
          onSubmit={handleSubmit}
          onCancel={() => setModalState({ open: false, goal: null })}
          loading={createMut.isPending || updateMut.isPending}
        />
      </Modal>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-4`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color.split(' ')[1]}`}>{value}</p>
    </div>
  );
}
