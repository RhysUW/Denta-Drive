const supabase = require('../config/db');

const listCustomMedications = async (userId) => {
  const { data, error } = await supabase
    .from('custom_medications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

const upsertPatch = async (userId, { drugClass, drugName }) => {
  // Find existing patch row for this user + drug class
  const { data: existing } = await supabase
    .from('custom_medications')
    .select('id, drug_names')
    .eq('user_id', userId)
    .eq('drug_class', drugClass)
    .eq('type', 'patch')
    .maybeSingle();

  if (existing) {
    const merged = [...new Set([...existing.drug_names, drugName])];
    const { data, error } = await supabase
      .from('custom_medications')
      .update({ drug_names: merged })
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from('custom_medications')
    .insert({ user_id: userId, type: 'patch', drug_class: drugClass, drug_names: [drugName] })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const createNewClass = async (userId, classData) => {
  const { data, error } = await supabase
    .from('custom_medications')
    .insert({
      user_id: userId,
      type: 'new_class',
      drug_class: classData.drugClass,
      drug_names: classData.drugNames ?? [],
      mechanism: classData.mechanism ?? null,
      purpose: classData.purpose ?? null,
      side_effects: classData.sideEffects ?? null,
      dental_considerations: classData.dentalConsiderations ?? null,
      drug_interactions: classData.drugInteractions ?? null,
      category: classData.category ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteCustomMedication = async (userId, id) => {
  const { error } = await supabase
    .from('custom_medications')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
};

module.exports = { listCustomMedications, upsertPatch, createNewClass, deleteCustomMedication };
