import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const DAYS = [
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
  { label: 'Sunday', value: 0 },
];

const STORAGE_KEY = 'dentaltrack_availability';

export function loadAvailability() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    // Discard old format (object with daysOfWeek) — must be an array now
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function saveAvailability(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function defaultDayEntry() {
  return { startTime: '09:00', endTime: '17:00' };
}

export default function AvailabilityModal({ open, onClose, onSave }) {
  const existing = loadAvailability();

  // daySchedule: { [dayValue]: { startTime, endTime } } for enabled days
  const [daySchedule, setDaySchedule] = useState(() => {
    if (!existing) return {};
    return Object.fromEntries(
      existing.map(({ day, startTime, endTime }) => [day, { startTime, endTime }])
    );
  });

  const toggleDay = (value) => {
    setDaySchedule((prev) => {
      if (value in prev) {
        const next = { ...prev };
        delete next[value];
        return next;
      }
      return { ...prev, [value]: defaultDayEntry() };
    });
  };

  const updateTime = (day, field, value) => {
    setDaySchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSave = () => {
    const entries = DAYS
      .filter(({ value }) => value in daySchedule)
      .map(({ value }) => ({
        day: value,
        startTime: daySchedule[value].startTime,
        endTime: daySchedule[value].endTime,
      }));

    const availability = entries.length > 0 ? entries : null;
    saveAvailability(availability);
    onSave(availability);
    onClose();
  };

  const handleClear = () => {
    saveAvailability(null);
    onSave(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Set Availability">
      <div className="space-y-1">
        {DAYS.map(({ label, value }) => {
          const enabled = value in daySchedule;
          return (
            <div
              key={value}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                enabled ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => toggleDay(value)}
                className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                  enabled
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                {enabled && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <span className={`text-sm font-medium w-24 flex-shrink-0 ${enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                {label}
              </span>

              {enabled ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={daySchedule[value].startTime}
                    onChange={(e) => updateTime(value, 'startTime', e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                  <span className="text-gray-400 text-sm flex-shrink-0">to</span>
                  <input
                    type="time"
                    value={daySchedule[value].endTime}
                    onChange={(e) => updateTime(value, 'endTime', e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                </div>
              ) : (
                <span className="text-sm text-gray-400">Not working</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
        <button
          onClick={handleClear}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear availability
        </button>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}
