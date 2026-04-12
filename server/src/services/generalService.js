const supabase = require('../config/db');

const listCategories = async (userId) => {
  const { data, error } = await supabase
    .from('general_categories')
    .select('*, general_entries(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

const createCategory = async (userId, { name, colour }) => {
  const { data, error } = await supabase
    .from('general_categories')
    .insert({ user_id: userId, name, colour })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const updateCategory = async (userId, id, { name, colour }) => {
  const { data, error } = await supabase
    .from('general_categories')
    .update({ name, colour })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteCategory = async (userId, id) => {
  const { error } = await supabase
    .from('general_categories')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
};

const addEntry = async (userId, categoryId, { name, type, content, dataUrl, fileName, fileType }) => {
  const { data, error } = await supabase
    .from('general_entries')
    .insert({
      user_id: userId,
      category_id: categoryId,
      name,
      type,
      content: content ?? null,
      data_url: dataUrl ?? null,
      file_name: fileName ?? null,
      file_type: fileType ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const updateEntry = async (userId, id, { name, type, content, dataUrl, fileName, fileType }) => {
  const { data, error } = await supabase
    .from('general_entries')
    .update({
      name,
      type,
      content: content ?? null,
      data_url: dataUrl ?? null,
      file_name: fileName ?? null,
      file_type: fileType ?? null,
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteEntry = async (userId, id) => {
  const { error } = await supabase
    .from('general_entries')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
};

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  addEntry,
  updateEntry,
  deleteEntry,
};
