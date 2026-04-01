import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const STORAGE_KEY = 'dentaltrack_availability';

export function loadAvailability() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveAvailability(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Modal for setting hours on a single specific date.
 * Props:
 *  - open, onClose
 *  - date: 'YYYY-MM-DD' string
 *  - existingEntry: { startTime, endTime } or null
 *  - onSave(date, startTime, endTime)
 *  - onRemove(date)
 */
export default function AvailabilityModal({ open, onClose, date, existingEntry, onSave, onRemove }) {
  const [startTime, setStartTime] = useState(existingEntry?.startTime ?? '09:00');
  const [endTime, setEndTime] = useState(existingEntry?.endTime ?? '17:00');

  if (!date) return null;

  const formattedDate = format(parseISO(date), 'EEEE, d MMMM yyyy');

  const handleSave = () => {
    onSave(date, startTime, endTime);
    onClose();
  };

  const handleRemove = () => {
    onRemove(date);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={formattedDate}>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Set your working hours for this day.</p>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Start time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-gray-400 mt-5">to</span>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">End time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between pt-1">
          {existingEntry ? (
            <button
              onClick={handleRemove}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Remove availability
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
