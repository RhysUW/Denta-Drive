import { useRef, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarDays, X } from 'lucide-react';
import { listAppointments } from '../services/appointmentService';
import { listAvailability, upsertAvailability, removeAvailability } from '../services/availabilityService';
import AppointmentModal from '../components/calendar/AppointmentModal';
import AvailabilityModal from '../components/calendar/AvailabilityModal';
import Button from '../components/ui/Button';
import { parseISO, addMonths, subMonths, format } from 'date-fns';

function appointmentColor(appointment) {
  const now = new Date();
  if (appointment.is_completed) return '#22c55e';
  if (new Date(appointment.appointment_at) < now) return '#ef4444';
  return '#6366f1';
}

export default function CalendarPage() {
  const calendarRef = useRef(null);
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');

  const [modalState, setModalState] = useState({ open: false, appointment: null, defaultDate: '' });
  const [availabilityMode, setAvailabilityMode] = useState(false);
  const [availabilityModal, setAvailabilityModal] = useState({ open: false, date: null, existingEntry: null });

  const { data: appointments = [], refetch } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => listAppointments({
      start: subMonths(new Date(), 3).toISOString(),
      end: addMonths(new Date(), 6).toISOString(),
    }),
  });

  const { data: availability = [] } = useQuery({
    queryKey: ['availability'],
    queryFn: listAvailability,
  });

  const upsertMutation = useMutation({
    mutationFn: upsertAvailability,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['availability'] }),
  });

  const removeMutation = useMutation({
    mutationFn: removeAvailability,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['availability'] }),
  });

  useEffect(() => {
    if (highlightId && appointments.length > 0) {
      const appt = appointments.find((a) => a.id === highlightId);
      if (appt && calendarRef.current) {
        const api = calendarRef.current.getApi();
        api.gotoDate(parseISO(appt.appointment_at));
        api.changeView('timeGridWeek');
      }
    }
  }, [highlightId, appointments]);

  const events = useMemo(() => [
    ...appointments.map((a) => ({
      id: a.id,
      title: `${a.patients?.name || 'Patient'} — ${a.title}`,
      start: a.appointment_at,
      end: new Date(new Date(a.appointment_at).getTime() + (a.duration_mins || 60) * 60000).toISOString(),
      backgroundColor: appointmentColor(a),
      borderColor: appointmentColor(a),
      extendedProps: { appointment: a },
      classNames: a.id === highlightId ? ['fc-event--highlighted'] : [],
    })),
    ...availability.map(({ date, startTime, endTime }) => ({
      id: `avail-${date}`,
      start: `${date}T${startTime}`,
      end: `${date}T${endTime}`,
      display: 'background',
      backgroundColor: '#3b82f6',
    })),
  ], [appointments, availability, highlightId]);

  const handleDateClick = (info) => {
    const date = info.dateStr.slice(0, 10);
    if (availabilityMode) {
      const existingEntry = availability.find((e) => e.date === date) ?? null;
      setAvailabilityModal({ open: true, date, existingEntry });
      return;
    }
    setModalState({ open: true, appointment: null, defaultDate: info.dateStr });
  };

  const handleEventClick = (info) => {
    if (!info.event.extendedProps.appointment) return;
    setModalState({
      open: true,
      appointment: info.event.extendedProps.appointment,
      defaultDate: '',
    });
    if (highlightId) setSearchParams({});
  };

  const handleEventDrop = async (info) => {
    const { appointment } = info.event.extendedProps;
    try {
      const { updateAppointment } = await import('../services/appointmentService');
      await updateAppointment(appointment.id, {
        appointment_at: info.event.start.toISOString(),
      });
      refetch();
    } catch {
      info.revert();
    }
  };

  const handleAvailabilitySave = (date, startTime, endTime) => {
    upsertMutation.mutate({ date, startTime, endTime });
  };

  const handleAvailabilityRemove = (date) => {
    removeMutation.mutate(date);
  };

  return (
    <div className="p-8 h-full">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {availabilityMode
              ? 'Click any date to set your working hours for that day'
              : 'Click a date to add an appointment, click an event to edit'}
          </p>
        </div>
        {availabilityMode ? (
          <Button
            icon={<X size={15} />}
            onClick={() => setAvailabilityMode(false)}
          >
            Done
          </Button>
        ) : (
          <Button
            variant="secondary"
            icon={<CalendarDays size={15} />}
            onClick={() => setAvailabilityMode(true)}
          >
            Set Availability
          </Button>
        )}
      </div>

      {availabilityMode && (
        <div className="mb-4 flex items-center gap-2.5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-sm text-blue-700">
          <CalendarDays size={15} className="flex-shrink-0" />
          <span>Availability mode — click any date to add or edit your working hours. Click <strong>Done</strong> when finished.</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          editable={!availabilityMode}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="calc(100vh - 260px)"
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          expandRows={true}
          dayCellClassNames={(arg) => {
            const dateStr = format(arg.date, 'yyyy-MM-dd');
            return availability.some((e) => e.date === dateStr) ? ['fc-day--available'] : [];
          }}
          eventClassNames={(info) =>
            info.event.id === highlightId ? ['fc-event--highlighted'] : []
          }
        />
      </div>

      <AppointmentModal
        open={modalState.open}
        onClose={() => setModalState({ open: false, appointment: null, defaultDate: '' })}
        appointment={modalState.appointment}
        defaultDate={modalState.defaultDate}
        onSuccess={refetch}
      />

      <AvailabilityModal
        open={availabilityModal.open}
        onClose={() => setAvailabilityModal({ open: false, date: null, existingEntry: null })}
        date={availabilityModal.date}
        existingEntry={availabilityModal.existingEntry}
        onSave={handleAvailabilitySave}
        onRemove={handleAvailabilityRemove}
      />
    </div>
  );
}
