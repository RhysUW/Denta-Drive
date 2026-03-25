import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, FileText, CheckCircle2, Circle } from 'lucide-react';
import { getPatient } from '../services/patientService';
import { listAppointments } from '../services/appointmentService';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import { formatDateTime } from '../utils/formatters';

export default function PatientAppointmentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: patient, isLoading: patientLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatient(id),
  });

  const { data: appointments = [], isLoading: apptLoading } = useQuery({
    queryKey: ['appointments', { patient_id: id }],
    queryFn: () => listAppointments({ patient_id: id }),
    enabled: !!id,
  });

  const now = new Date();
  const past = appointments
    .filter((a) => new Date(a.appointment_at) <= now || a.is_completed)
    .sort((a, b) => new Date(b.appointment_at) - new Date(a.appointment_at));

  if (patientLoading || apptLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!patient) {
    return <div className="p-8 text-center text-gray-400">Patient not found.</div>;
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate(`/patients/${id}`)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to {patient.name}
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Previous Appointments</h1>
        <p className="text-sm text-gray-400 mt-1">
          {patient.name} &middot; {patient.temp_number} &middot; {past.length} appointment{past.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* List */}
      {past.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
          <p className="text-sm text-gray-400">No previous appointments recorded.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {past.map((appt) => (
            <div
              key={appt.id}
              className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5"
            >
              {/* Row 1: title + status */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{appt.title}</h3>
                {appt.is_completed ? (
                  <Badge variant="green">Completed</Badge>
                ) : (
                  <Badge variant="yellow">Not marked complete</Badge>
                )}
              </div>

              {/* Row 2: meta */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {formatDateTime(appt.appointment_at)}
                </span>
                {appt.duration_mins && (
                  <span className="flex items-center gap-1.5">
                    <Circle size={12} />
                    {appt.duration_mins} min
                  </span>
                )}
              </div>

              {/* Notes */}
              {appt.notes ? (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <FileText size={11} /> Notes
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{appt.notes}</p>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-300 italic">No notes recorded for this appointment.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
