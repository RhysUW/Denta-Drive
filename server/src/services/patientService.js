const supabase = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const listPatients = async (userId, { search, page = 1, limit = 20, sort = 'created_desc' }) => {
  let query = supabase
    .from('patients_with_next_appt')
    .select('id, temp_number, name, age, gender, contact, created_at, next_appointment_at', { count: 'exact' })
    .eq('user_id', userId)
    .range((page - 1) * limit, page * limit - 1);

  if (search) {
    query = query.or(`name.ilike.%${search}%,temp_number.ilike.%${search}%`);
  }

  if (sort === 'appt_asc') {
    query = query.order('next_appointment_at', { ascending: true });
  } else if (sort === 'appt_desc') {
    query = query.order('next_appointment_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return { patients: data, total: count, page, limit };
};

const getPatient = async (userId, patientId) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', patientId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    const err = new Error('Patient not found');
    err.status = 404;
    throw err;
  }

  return data;
};

const calcAge = (dob) => {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const createPatient = async (userId, patientData) => {
  const age = patientData.date_of_birth ? calcAge(patientData.date_of_birth) : null;
  const { data, error } = await supabase
    .from('patients')
    .insert({ ...patientData, age, user_id: userId })
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

const updatePatient = async (userId, patientId, patientData) => {
  const age = patientData.date_of_birth ? calcAge(patientData.date_of_birth) : undefined;
  const payload = age !== undefined ? { ...patientData, age } : patientData;
  const { data, error } = await supabase
    .from('patients')
    .update(payload)
    .eq('id', patientId)
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error || !data) {
    const err = new Error('Patient not found');
    err.status = 404;
    throw err;
  }

  return data;
};

const deletePatient = async (userId, patientId) => {
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', patientId)
    .eq('user_id', userId);

  if (error) throw error;
};

// Image management
const getSignedUploadUrl = async (userId, patientId, filename, mimeType) => {
  // Verify patient belongs to user
  await getPatient(userId, patientId);

  const ext = filename.split('.').pop();
  const storagePath = `patient-images/${userId}/${patientId}/${uuidv4()}-${filename}`;

  const { data, error } = await supabase.storage
    .from('patient-images')
    .createSignedUploadUrl(storagePath);

  if (error) throw error;

  return { signedUrl: data.signedUrl, storagePath, token: data.token };
};

const recordImage = async (userId, patientId, { storagePath, filename, mimeType }) => {
  await getPatient(userId, patientId);

  const { data, error } = await supabase
    .from('patient_images')
    .insert({ patient_id: patientId, user_id: userId, storage_path: storagePath, filename, mime_type: mimeType })
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

const listImages = async (userId, patientId) => {
  await getPatient(userId, patientId);

  const { data, error } = await supabase
    .from('patient_images')
    .select('*')
    .eq('patient_id', patientId)
    .eq('user_id', userId)
    .order('uploaded_at', { ascending: false });

  if (error) throw error;

  // Generate signed download URLs (1 hour expiry)
  const imagesWithUrls = await Promise.all(
    data.map(async (img) => {
      const { data: urlData } = await supabase.storage
        .from('patient-images')
        .createSignedUrl(img.storage_path, 3600);
      return { ...img, url: urlData?.signedUrl || null };
    })
  );

  return imagesWithUrls;
};

const deleteImage = async (userId, patientId, imageId) => {
  const { data: img, error: fetchErr } = await supabase
    .from('patient_images')
    .select('*')
    .eq('id', imageId)
    .eq('patient_id', patientId)
    .eq('user_id', userId)
    .single();

  if (fetchErr || !img) {
    const err = new Error('Image not found');
    err.status = 404;
    throw err;
  }

  // Delete from storage
  await supabase.storage.from('patient-images').remove([img.storage_path]);

  // Delete DB record
  const { error } = await supabase
    .from('patient_images')
    .delete()
    .eq('id', imageId);

  if (error) throw error;
};

module.exports = {
  listPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getSignedUploadUrl,
  recordImage,
  listImages,
  deleteImage,
};
