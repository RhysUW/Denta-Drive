import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarDays } from 'lucide-react';
import { listAppointments } from '../services/appointmentService';
import AppointmentModal from '../components/calendar/AppointmentModal';
import AvailabilityModal, { loadAvailability } from '../components/calendar/AvailabilityModal';
import Button from '../components/ui/Button';
import { parseISO, addMonths, subMonths } from 'date-fns';

function appointmentColor(appointment) {
  const now = new Date();
  if (appointment.is_completed) return '#22c55e';
  if (new Date(appointment.appointment_at) < now) return '#ef4444';
  return '#6366f1';
}

export default function CalendarPage() {
  const calendarRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');

  const [modalState, setModalState] = useState({ open: false, appointment: null, defaultDate: '' });
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [availability, setAvailability] = useState(loadAvailability);

  // Fetch a wide range — 3 months back and 3 months forward
  const { data: appointments = [], refetch } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => listAppointments({
      start: subMonths(new Date(), 3).toISOString(),
      end: addMonths(new Date(), 6).toISOString(),
    }),
  });

  // Navigate to highlighted appointment date
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

  const appointmentEvents = appointments.map((a) => ({
    id: a.id,
    title: `${a.patients?.name || 'Patient'} — ${a.title}`,
    start: a.appointment_at,
    end: new Date(new Date(a.appointment_at).getTime() + (a.duration_mins || 60) * 60000).toISOString(),
    backgroundColor: appointmentColor(a),
    borderColor: appointmentColor(a),
    extendedProps: { appointment: a },
    classNames: a.id === highlightId ? ['fc-event--highlighted'] : [],
  }));

  const availabilityEvent = availability
    ? availability.map(({ day, startTime, endTime }) => ({
        daysOfWeek: [day],
        startTime,
        endTime,
        display: 'background',
        backgroundColor: '#3b82f6',
        startRecur: '2020-01-01',
        endRecur: '2099-12-31',
      }))
    : [];

  const events = [...appointmentEvents, ...availabilityEvent];

  const handleDateClick = (info) => {
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

  const handleModalClose = () => {
    setModalState({ open: false, appointment: null, defaultDate: '' });
  };

  return (
    <div className="p-8 h-full">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Click a date to add an appointment, click an event to edit
          </p>
        </div>
        <Button
          variant="secondary"
          icon={<CalendarDays size={15} />}
          onClick={() => setAvailabilityOpen(true)}
        >
          {availability ? 'Edit Availability' : 'Set Availability'}
        </Button>
      </div>

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
          editable={true}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="calc(100vh - 260px)"
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          expandRows={true}
          eventClassNames={(info) =>
            info.event.id === highlightId ? ['fc-event--highlighted'] : []
          }
        />
      </div>

      <AppointmentModal
        open={modalState.open}
        onClose={handleModalClose}
        appointment={modalState.appointment}
        defaultDate={modalState.defaultDate}
        onSuccess={refetch}
      />

      <AvailabilityModal
        open={availabilityOpen}
        onClose={() => setAvailabilityOpen(false)}
        onSave={setAvailability}
      />
    </div>
  );
}
