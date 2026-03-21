const supabase = require('../config/db');

const listGoals = async (userId, semester) => {
  let query = supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (semester) query = query.eq('semester', semester);

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

const createGoal = async (userId, goalData) => {
  const { data, error } = await supabase
    .from('goals')
    .insert({ ...goalData, user_id: userId })
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

const updateGoal = async (userId, goalId, goalData) => {
  const { data, error } = await supabase
    .from('goals')
    .update(goalData)
    .eq('id', goalId)
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error || !data) {
    const err = new Error('Goal not found');
    err.status = 404;
    throw err;
  }

  return data;
};

const deleteGoal = async (userId, goalId) => {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', goalId)
    .eq('user_id', userId);

  if (error) throw error;
};

module.exports = { listGoals, createGoal, updateGoal, deleteGoal };
