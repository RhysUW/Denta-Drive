import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { updateGoal, deleteGoal } from '../../services/goalService';
import ProgressBar from '../ui/ProgressBar';
import toast from 'react-hot-toast';

export default function GoalCard({ goal, onEdit }) {
  const queryClient = useQueryClient();
  const pct = Math.min(100, Math.round((goal.current_count / goal.target_count) * 100));
  const isComplete = pct >= 100;

  const updateMut = useMutation({
    mutationFn: (delta) =>
      updateGoal(goal.id, { current_count: Math.max(0, goal.current_count + delta) }),
    onMutate: async (delta) => {
      await queryClient.cancelQueries({ queryKey: ['goals'] });
      const prev = queryClient.getQueryData(['goals', goal.semester]);
      queryClient.setQueryData(['goals', goal.semester], (old) =>
        old?.map((g) =>
          g.id === goal.id
            ? { ...g, current_count: Math.max(0, g.current_count + delta) }
            : g
        )
      );
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(['goals', goal.semester], ctx.prev);
      toast.error('Failed to update');
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  });

  const deleteMut = useMutation({
    mutationFn: () => deleteGoal(goal.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success('Goal deleted');
    },
    onError: () => toast.error('Failed to delete goal'),
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: goal.color }} />
          <h3 className="text-sm font-semibold text-gray-900 truncate">{goal.title}</h3>
          {isComplete && (
            <CheckCircle size={16} className="text-green-500 shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(goal)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => deleteMut.mutate()}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-3xl font-bold text-gray-900">{goal.current_count}</span>
          <span className="text-sm text-gray-400">/ {goal.target_count}</span>
        </div>
        <ProgressBar value={goal.current_count} max={goal.target_count} color={goal.color} />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">{goal.semester}</span>
          <span
            className="text-xs font-semibold"
            style={{ color: isComplete ? '#22c55e' : goal.color }}
          >
            {pct}%{isComplete ? ' Complete!' : ''}
          </span>
        </div>
      </div>

      {/* Counter controls */}
      <div className="flex items-center justify-center gap-4 pt-1">
        <button
          onClick={() => updateMut.mutate(-1)}
          disabled={goal.current_count === 0}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus size={16} />
        </button>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
          style={{ backgroundColor: isComplete ? '#22c55e' : goal.color }}
        >
          +
        </div>
        <button
          onClick={() => updateMut.mutate(1)}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
          style={{ borderColor: goal.color, color: goal.color }}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
