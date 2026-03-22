const supabase = require('../config/db');

const getTemplate = async (userId, templateId) => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', templateId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    const err = new Error('Template not found');
    err.status = 404;
    throw err;
  }

  return data;
};

const listTemplates = async (userId) => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

const createTemplate = async (userId, templateData) => {
  const { data, error } = await supabase
    .from('templates')
    .insert({ ...templateData, user_id: userId })
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

const updateTemplate = async (userId, templateId, templateData) => {
  const { data, error } = await supabase
    .from('templates')
    .update(templateData)
    .eq('id', templateId)
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error || !data) {
    const err = new Error('Template not found');
    err.status = 404;
    throw err;
  }

  return data;
};

const deleteTemplate = async (userId, templateId) => {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', templateId)
    .eq('user_id', userId);

  if (error) throw error;
};

module.exports = { getTemplate, listTemplates, createTemplate, updateTemplate, deleteTemplate };