import api from './api';

export const listCustomMedications = () =>
  api.get('/custom-medications').then((r) => r.data);

export const upsertPatch = ({ drugClass, drugName }) =>
  api.post('/custom-medications/patch', { drugClass, drugName }).then((r) => r.data);

export const createNewClass = (classData) =>
  api.post('/custom-medications/class', classData).then((r) => r.data);

export const deleteCustomMedication = (id) =>
  api.delete(`/custom-medications/${id}`);
