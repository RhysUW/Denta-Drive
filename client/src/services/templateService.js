import api from './api';

export const getTemplate = async (id) => {
  const { data } = await api.get(`/templates/${id}`);
  return data;
};

export const listTemplates = async () => {
  const { data } = await api.get('/templates');
  return data;
};

export const createTemplate = async (payload) => {
  const { data } = await api.post('/templates', payload);
  return data;
};

export const updateTemplate = async (id, payload) => {
  const { data } = await api.put(`/templates/${id}`, payload);
  return data;
};

export const deleteTemplate = async (id) => {
  await api.delete(`/templates/${id}`);
};