import api from './api';

// Map DB snake_case entry fields to camelCase expected by the component
const mapEntry = (e) => ({
  id: e.id,
  name: e.name,
  type: e.type,
  content: e.content ?? undefined,
  dataUrl: e.data_url ?? undefined,
  fileName: e.file_name ?? undefined,
  fileType: e.file_type ?? undefined,
});

// Map DB category (with nested entries) to component shape
const mapCategory = (c) => ({
  id: c.id,
  name: c.name,
  colour: c.colour,
  entries: (c.general_entries ?? [])
    .slice()
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map(mapEntry),
});

export const listCategories = () =>
  api.get('/general/categories').then((r) => r.data.map(mapCategory));

export const createCategory = ({ name, colour }) =>
  api.post('/general/categories', { name, colour }).then((r) => mapCategory({ ...r.data, general_entries: [] }));

export const updateCategory = (id, { name, colour }) =>
  api.put(`/general/categories/${id}`, { name, colour }).then((r) => r.data);

export const deleteCategory = (id) =>
  api.delete(`/general/categories/${id}`);

export const addEntry = (categoryId, entryData) =>
  api.post(`/general/categories/${categoryId}/entries`, entryData).then((r) => mapEntry(r.data));

export const updateEntry = (id, entryData) =>
  api.put(`/general/entries/${id}`, entryData).then((r) => mapEntry(r.data));

export const deleteEntry = (id) =>
  api.delete(`/general/entries/${id}`);
