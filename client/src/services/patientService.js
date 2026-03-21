import api from './api';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const listPatients = (params) => api.get('/patients', { params }).then((r) => r.data);
export const getPatient = (id) => api.get(`/patients/${id}`).then((r) => r.data);
export const createPatient = (data) => api.post('/patients', data).then((r) => r.data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data).then((r) => r.data);
export const deletePatient = (id) => api.delete(`/patients/${id}`);

export const listImages = (patientId) =>
  api.get(`/patients/${patientId}/images`).then((r) => r.data);

export const uploadImage = async (patientId, file) => {
  // Step 1: Get signed upload URL from server
  const { data: urlData } = await api.post(`/patients/${patientId}/images/upload-url`, {
    filename: file.name,
    mimeType: file.type,
  });

  // Step 2: Upload directly to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('patient-images')
    .uploadToSignedUrl(urlData.storagePath, urlData.token, file, {
      contentType: file.type,
    });

  if (uploadError) throw uploadError;

  // Step 3: Record metadata in DB
  const { data: imageRecord } = await api.post(`/patients/${patientId}/images`, {
    storagePath: urlData.storagePath,
    filename: file.name,
    mimeType: file.type,
  });

  return imageRecord;
};

export const deleteImage = (patientId, imageId) =>
  api.delete(`/patients/${patientId}/images/${imageId}`);
