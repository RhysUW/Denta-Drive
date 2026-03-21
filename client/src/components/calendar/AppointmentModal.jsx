import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createAppointment, updateAppointment, deleteAppointment } from '../../services/appointmentService';
import { listPatients } from '../../services/patientService';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDateForInput } from '../../utils/formatters';

const schema = z.object({
  patient_id: z.string().min(1, 'Select a patient'),
  title: z.string().min(1, 'Title is required'),
  appointment_at: z.string().min(1, 'Date/time is required'),
  duration_mins: z.coerce.number().int().min(5).max(480),
  notes: z.string().optional(),
  is_completed: z.boolean().optional(),
});

export default function AppointmentModal({
  open,
  onClose,
  appointment = null,
  defaultPatientId = '',
  defaultPatientName = '',
  defaultDate = '',
  onSuccess,
}) {
  const queryClient = useQueryClient();
  const isEdit = !!appointment;
  const [patientSearch, setPatientSearch] = useState(defaultPatientName);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: patientsData } = useQuery({
    queryKey: ['patients', patientSearch],
    queryFn: () => listPatients({ search: patientSearch, limit: 10 }),
    enabled: showDropdown && patientSearch.length > 0,
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      patient_id: appointment?.patient_id || defaultPatientId,
      title: appointment?.title || '',
      appointment_at: appointment ? formatDateForInput(appointment.appointment_at) : defaultDate,
      duration_mins: appointment?.duration_mins || 60,
      notes: appointment?.notes || '',
      is_completed: appointment?.is_completed || false,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        patient_id: appointment?.patient_id || defaultPatientId,
        title: appointment?.title || '',
        appointment_at: appointment ? formatDateForInput(appointment.appointment_at) : defaultDate,
        duration_mins: appointment?.duration_mins || 60,
        notes: appointment?.notes || '',
        is_completed: appointment?.is_completed || false,
      });
      setPatientSearch(appointment?.patients?.name || defaultPatientName);
    }
  }, [open]);

  const createMut = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      onSuccess?.();
      onClose();
      toast.success('Appointment created');
    },
    onError: (err) => toast.error(err.response?.data?.error || 'Failed to create appointment'),
  });

  const updateMut = useMutation({
    mutationFn: (data) => updateAppointment(appointment.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      onSuccess?.();
      onClose();
      toast.success('Appointment updated');
    },
    onError: () => toast.error('Failed to update appointment'),
  });

  const deleteMut = useMutation({
    mutationFn: () => deleteAppointment(appointment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      onSuccess?.();
      onClose();
      toast.success('Appointment deleted');
    },
    onError: () => toast.error('Failed to delete appointment'),
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      appointment_at: new Date(data.appointment_at).toISOString(),
    };
    if (isEdit) updateMut.mutate(payload);
    else createMut.mutate(payload);
  };

  const patients = patientsData?.patients || [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Appointment' : 'New Appointment'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Patient selector */}
        {!defaultPatientId && (
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium text-gray-700">Patient *</label>
            <input
              value={patientSearch}
              onChange={(e) => { setPatientSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search patient..."
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${errors.patient_id ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.patient_id && <p className="text-xs text-red-500">{errors.patient_id.message}</p>}
            {showDropdown && patients.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                {patients.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex justify-between"
                    onClick={() => {
                      setValue('patient_id', p.id);
                      setPatientSearch(p.name);
                      setShowDropdown(false);
                    }}
                  >
                    <span>{p.name}</span>
                    <span className="text-gray-400 text-xs">{p.temp_number}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <Input
          label="Title *"
          placeholder="e.g. Composite Filling - UR6"
          error={errors.title?.message}
          {...register('title')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date & Time *"
            type="datetime-local"
            error={errors.appointment_at?.message}
            {...register('appointment_at')}
          />
          <Input
            label="Duration (mins)"
            type="number"
            error={errors.duration_mins?.message}
            {...register('duration_mins')}
          />
        </div>

        <Textarea label="Notes" placeholder="Any notes..." rows={2} {...register('notes')} />

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded" {...register('is_completed')} />
          <span className="text-sm text-gray-700">Mark as completed</span>
        </label>

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
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={createMut.isPending || updateMut.isPending}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
