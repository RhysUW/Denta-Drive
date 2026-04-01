import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Edit2, Trash2, Phone, MapPin, Calendar, CalendarDays, Clock, Maximize2, Minimize2, History,
} from 'lucide-react';
import { getPatient, updatePatient, deletePatient } from '../services/patientService';
import { listAppointments } from '../services/appointmentService';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import MedicationBadge from '../components/ui/MedicationBadge';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import PatientForm from '../components/patients/PatientForm';
import ImageUploader from '../components/patients/ImageUploader';
import AppointmentModal from '../components/calendar/AppointmentModal';
import { formatDate, formatDateTime, genderBadgeVariant } from '../utils/formatters';
import toast from 'react-hot-toast';

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-400"><Icon size={16} /></div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [addApptOpen, setAddApptOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [myNotes, setMyNotes] = useState('');
  const [previousNotes, setPreviousNotes] = useState('');
  const [myNotesExpanded, setMyNotesExpanded] = useState(false);
  const [previousNotesExpanded, setPreviousNotesExpanded] = useState(false);

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatient(id),
  });

  useEffect(() => {
    if (patient) {
      setMyNotes(patient.my_notes || '');
      setPreviousNotes(patient.previous_notes || '');
    }
  }, [patient]);

  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments', { patient_id: id }],
    queryFn: () => listAppointments({ patient_id: id }),
    enabled: !!id,
  });

  const saveNotesMutation = useMutation({
    mutationFn: (data) => updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
      toast.success('Notes saved');
    },
    onError: () => toast.error('Failed to save notes'),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setEditOpen(false);
      toast.success('Patient updated');
    },
    onError: () => toast.error('Failed to update patient'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success('Patient deleted');
      navigate('/');
    },
    onError: () => toast.error('Failed to delete patient'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-8 text-center text-gray-400">Patient not found.</div>
    );
  }

  const now = new Date();
  const upcomingAppointments = appointments
    .filter((a) => new Date(a.appointment_at) > now && !a.is_completed)
    .sort((a, b) => new Date(a.appointment_at) - new Date(b.appointment_at));

  const pastAppointments = appointments
    .filter((a) => new Date(a.appointment_at) <= now || a.is_completed)
    .sort((a, b) => new Date(b.appointment_at) - new Date(a.appointment_at));

  const nextAppointment = upcomingAppointments[0];

  const handleViewInCalendar = () => {
    if (nextAppointment) {
      navigate(`/calendar?highlight=${nextAppointment.id}`);
    }
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Patients
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <span className="text-xs font-mono font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
              {patient.temp_number}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {patient.gender && <Badge variant={genderBadgeVariant(patient.gender)}>{patient.gender}</Badge>}
            {patient.date_of_birth && (
              <span className="text-sm text-gray-500">
                {patient.age} years old &middot; DOB: {new Date(patient.date_of_birth).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={<Edit2 size={14} />} onClick={() => setEditOpen(true)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" icon={<Trash2 size={14} />} onClick={() => setDeleteConfirm(true)}>
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-1 space-y-4">
          {/* Contact info card */}
          <div className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Contact Information</h3>
            <InfoRow icon={Phone} label="Phone" value={patient.contact} />
            <InfoRow icon={MapPin} label="Address" value={patient.address} />
          </div>

          {/* Appointments summary card */}
          <div className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Next Appointment</h3>
            {nextAppointment ? (
              <div>
                <p className="text-sm font-medium text-gray-800">{nextAppointment.title}</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Clock size={13} />
                  {formatDateTime(nextAppointment.appointment_at)}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<CalendarDays size={13} />}
                  className="mt-3 w-full justify-center"
                  onClick={handleViewInCalendar}
                >
                  View in Calendar
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-2 space-y-4">
          {/* Health info */}
          <div className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Health Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-2">Health Conditions</p>
                {patient.health_conditions?.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {patient.health_conditions.map((c) => (
                      <Badge key={c} variant="red">{c}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">None recorded</p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Current Medications</p>
                {patient.current_medications?.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {patient.current_medications.map((m) => (
                      <MedicationBadge key={m} name={m} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">None recorded</p>
                )}
              </div>
            </div>
            {patient.remarks && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Remarks</p>
                <p className="text-sm text-gray-700 leading-relaxed">{patient.remarks}</p>
              </div>
            )}
          </div>

          {/* Appointments list */}
          <div className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Appointments</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" icon={<History size={13} />} onClick={() => navigate(`/patients/${id}/appointments`)}>
                  Previous Appointments
                </Button>
                <Button size="sm" icon={<Calendar size={13} />} onClick={() => setAddApptOpen(true)}>
                  Add
                </Button>
              </div>
            </div>

            {appointments.length === 0 ? (
              <p className="text-sm text-gray-400">No appointments yet.</p>
            ) : (
              <div className="space-y-2">
                {upcomingAppointments.length > 0 && (
                  <>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Upcoming</p>
                    {upcomingAppointments.map((a) => (
                      <AppointmentRow key={a.id} appointment={a} onClick={() => setSelectedAppointment(a)} />
                    ))}
                  </>
                )}
                {pastAppointments.length > 0 && (
                  <>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-3">Past</p>
                    {pastAppointments.map((a) => (
                      <AppointmentRow key={a.id} appointment={a} past onClick={() => setSelectedAppointment(a)} />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {/* My Notes */}
          <div className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">My Notes</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMyNotesExpanded((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={myNotesExpanded ? 'Collapse' : 'Expand'}
                >
                  {myNotesExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>
                <Button size="sm" loading={saveNotesMutation.isPending} onClick={() => saveNotesMutation.mutate({ my_notes: myNotes })}>
                  Save
                </Button>
              </div>
            </div>
            <textarea
              value={myNotes}
              onChange={(e) => setMyNotes(e.target.value)}
              placeholder="Write your personal notes about this patient..."
              rows={myNotesExpanded ? undefined : 5}
              className={`w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${myNotesExpanded ? 'resize-none overflow-hidden' : 'resize-y'}`}
              style={myNotesExpanded ? { height: 'auto', minHeight: '8rem', fieldSizing: 'content' } : {}}
            />
          </div>

          {/* Previous Notes */}
          <div className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Previous Notes</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviousNotesExpanded((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={previousNotesExpanded ? 'Collapse' : 'Expand'}
                >
                  {previousNotesExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>
                <Button size="sm" loading={saveNotesMutation.isPending} onClick={() => saveNotesMutation.mutate({ previous_notes: previousNotes })}>
                  Save
                </Button>
              </div>
            </div>
            <textarea
              value={previousNotes}
              onChange={(e) => setPreviousNotes(e.target.value)}
              placeholder="Notes from previous practitioners or records..."
              rows={previousNotesExpanded ? undefined : 5}
              className={`w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${previousNotesExpanded ? 'resize-none overflow-hidden' : 'resize-y'}`}
              style={previousNotesExpanded ? { height: 'auto', minHeight: '8rem', fieldSizing: 'content' } : {}}
            />
          </div>
          {/* Images */}
          <div className="bg-white rounded-2xl border border-brand-500 shadow-sm p-5">
            <ImageUploader patientId={id} />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Patient" size="lg">
        <PatientForm
          defaultValues={patient}
          onSubmit={(data) => updateMutation.mutate(data)}
          onCancel={() => setEditOpen(false)}
          loading={updateMutation.isPending}
        />
      </Modal>

      {/* Add Appointment Modal */}
      <AppointmentModal
        open={addApptOpen}
        onClose={() => setAddApptOpen(false)}
        defaultPatientId={id}
        defaultPatientName={patient.name}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['appointments', { patient_id: id }] })}
      />

      {/* View/Edit Appointment Modal */}
      <AppointmentModal
        open={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
        defaultPatientId={id}
        defaultPatientName={patient.name}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['appointments', { patient_id: id }] })}
      />

      {/* Delete Confirm */}
      <Modal open={deleteConfirm} onClose={() => setDeleteConfirm(false)} title="Delete Patient" size="sm">
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <strong>{patient.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteMutation.mutate()}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function AppointmentRow({ appointment, past, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-xl cursor-pointer transition-colors ${past ? 'bg-gray-50 hover:bg-gray-100' : 'bg-brand-50 hover:bg-brand-100'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-medium ${past ? 'text-gray-600' : 'text-gray-900'}`}>{appointment.title}</p>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={11} />
            {formatDateTime(appointment.appointment_at)}
          </span>
        </div>
        {appointment.is_completed && (
          <Badge variant="green">Completed</Badge>
        )}
      </div>
      {appointment.is_completed && appointment.notes && (
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{appointment.notes}</p>
      )}
    </div>
  );
}
