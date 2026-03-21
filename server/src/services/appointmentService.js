const supabase = require('../config/db');

const listAppointments = async (userId, { start, end, patient_id }) => {
  let query = supabase
    .from('appointments')
    .select('*, patients(id, name, temp_number)')
    .eq('user_id', userId)
    .order('appointment_at', { ascending: true });

  if (start) query = query.gte('appointment_at', start);
  if (end) query = query.lte('appointment_at', end);
  if (patient_id) query = query.eq('patient_id', patient_id);

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

const createAppointment = async (userId, appointmentData) => {
  // Verify patient belongs to user
  const { data: patient } = await supabase
    .from('patients')
    .select('id')
    .eq('id', appointmentData.patient_id)
    .eq('user_id', userId)
    .single();

  if (!patient) {
    const err = new Error('Patient not found');
    err.status = 404;
    throw err;
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert({ ...appointmentData, user_id: userId })
    .select('*, patients(id, name, temp_number)')
    .single();

  if (error) throw error;
  return data;
};

const updateAppointment = async (userId, appointmentId, appointmentData) => {
  const { data, error } = await supabase
    .from('appointments')
    .update(appointmentData)
    .eq('id', appointmentId)
    .eq('user_id', userId)
    .select('*, patients(id, name, temp_number)')
    .single();

  if (error || !data) {
    const err = new Error('Appointment not found');
    err.status = 404;
    throw err;
  }

  return data;
};

const deleteAppointment = async (userId, appointmentId) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', appointmentId)
    .eq('user_id', userId);

  if (error) throw error;
};

module.exports = { listAppointments, createAppointment, updateAppointment, deleteAppointment };
