import api from './api';

// Server returns snake_case; map to camelCase for component use
const mapEntry = (row) => ({
  id: row.id,
  date: row.date,
  startTime: row.start_time,
  endTime: row.end_time,
});

export const listAvailability = () =>
  api.get('/availability').then((r) => r.data.map(mapEntry));

export const upsertAvailability = (data) =>
  api.post('/availability', data).then((r) => mapEntry(r.data));

export const removeAvailability = (date) =>
  api.delete(`/availability/${date}`);
