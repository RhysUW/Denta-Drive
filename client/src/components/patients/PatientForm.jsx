import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

const schema = z.object({
  temp_number: z.string().min(1, 'Temp number is required'),
  name: z.string().min(1, 'Name is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other', '']).optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
  remarks: z.string().optional(),
});

function TagInput({ label, tags, onChange }) {
  const [input, setInput] = useState('');

  const add = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInput('');
  };

  const remove = (tag) => onChange(tags.filter((t) => t !== tag));

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="Type and press Enter"
          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        <Button type="button" variant="secondary" size="sm" onClick={add} icon={<Plus size={14} />}>
          Add
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
            >
              {tag}
              <button type="button" onClick={() => remove(tag)} className="text-gray-400 hover:text-gray-600">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PatientForm({ defaultValues = {}, onSubmit, onCancel, loading }) {
  const [healthConditions, setHealthConditions] = useState(defaultValues.health_conditions || []);
  const [medications, setMedications] = useState(defaultValues.current_medications || []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      temp_number: defaultValues.temp_number || '',
      name: defaultValues.name || '',
      date_of_birth: defaultValues.date_of_birth || '',
      gender: defaultValues.gender || '',
      address: defaultValues.address || '',
      contact: defaultValues.contact || '',
      remarks: defaultValues.remarks || '',
    },
  });

  const submit = (data) => {
    const payload = {
      ...data,
      temp_number: data.temp_number,
      gender: data.gender || null,
      health_conditions: healthConditions,
      current_medications: medications,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input label="Temp Number *" placeholder="e.g. 0001" error={errors.temp_number?.message} {...register('temp_number')} />
        </div>
        <div className="col-span-2">
          <Input label="Full Name *" placeholder="Patient full name" error={errors.name?.message} {...register('name')} />
        </div>
        <Input label="Date of Birth *" type="date" error={errors.date_of_birth?.message} {...register('date_of_birth')} />
        <Select label="Gender" error={errors.gender?.message} {...register('gender')}>
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
      </div>
      <Input label="Contact" placeholder="+1 234 567 8900" {...register('contact')} />
      <Input label="Address" placeholder="Street, City, State" {...register('address')} />
      <TagInput label="Health Conditions" tags={healthConditions} onChange={setHealthConditions} />
      <TagInput label="Current Medications" tags={medications} onChange={setMedications} />
      <Textarea label="Remarks" placeholder="Additional notes..." rows={3} {...register('remarks')} />

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>Save Patient</Button>
      </div>
    </form>
  );
}
