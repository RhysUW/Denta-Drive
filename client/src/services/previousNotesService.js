import api from './api';

export const listPreviousNotes = (patientId) =>
  api.get(`/patients/${patientId}/previous-notes`).then((r) => r.data);

export const createPreviousNote = (patientId, content) =>
  api.post(`/patients/${patientId}/previous-notes`, { content }).then((r) => r.data);

export const deletePreviousNote = (patientId, noteId) =>
  api.delete(`/patients/${patientId}/previous-notes/${noteId}`);
