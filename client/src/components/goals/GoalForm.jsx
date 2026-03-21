import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { currentSemester } from '../../utils/formatters';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  target_count: z.coerce.number().int().min(1, 'Must be at least 1'),
  semester: z.string().min(1, 'Semester is required'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

const PRESET_COLORS = [
  '#6366f1', // indigo
  '#3b82f6', // blue
  '#22c55e', // green
  '#f59e0b', // amber
  '#ec4899', // pink
  '#14b8a6', // teal
];

const SEMESTER_OPTIONS = (() => {
  const opts = [];
  const now = new Date();
  for (let i = -1; i <= 2; i++) {
    const year = now.getFullYear() + Math.floor((now.getMonth() + i * 6) / 12);
    const sem = (Math.floor((now.getMonth() + i * 6) / 6) % 2) + 1;
    const val = `${year}-S${sem}`;
    if (!opts.includes(val)) opts.push(val);
  }
  return [...new Set(opts)];
})();

export default function GoalForm({ defaultValues = {}, onSubmit, onCancel, loading }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues.title || '',
      target_count: defaultValues.target_count || 10,
      semester: defaultValues.semester || currentSemester(),
      color: defaultValues.color || '#6366f1',
    },
  });

  const selectedColor = watch('color');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Goal Title *"
        placeholder="e.g. Composite Fillings"
        error={errors.title?.message}
        {...register('title')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Target Count *"
          type="number"
          min="1"
          error={errors.target_count?.message}
          {...register('target_count')}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Semester</label>
          <select
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            {...register('semester')}
          >
            {SEMESTER_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Color</label>
        <div className="flex gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setValue('color', c)}
              className={`w-7 h-7 rounded-full transition-transform ${selectedColor === c ? 'scale-125 ring-2 ring-offset-2 ring-gray-400' : 'hover:scale-110'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>Save Goal</Button>
      </div>
    </form>
  );
}
