const supabase = require('../config/db');

const listNotes = async (userId, patientId) => {
  const { data, error } = await supabase
    .from('patient_previous_notes')
    .select('*')
    .eq('patient_id', patientId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

const createNote = async (userId, patientId, content) => {
  const { data, error } = await supabase
    .from('patient_previous_notes')
    .insert({ patient_id: patientId, user_id: userId, content })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteNote = async (userId, noteId) => {
  const { error } = await supabase
    .from('patient_previous_notes')
    .delete()
    .eq('id', noteId)
    .eq('user_id', userId);
  if (error) throw error;
};

module.exports = { listNotes, createNote, deleteNote };
