const supabase = require('../config/db');

const listAvailability = async (userId) => {
  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
};

const upsertAvailability = async (userId, { date, startTime, endTime }) => {
  const { data, error } = await supabase
    .from('availability')
    .upsert(
      { user_id: userId, date, start_time: startTime, end_time: endTime },
      { onConflict: 'user_id,date' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
};

const removeAvailability = async (userId, date) => {
  const { error } = await supabase
    .from('availability')
    .delete()
    .eq('user_id', userId)
    .eq('date', date);
  if (error) throw error;
};

module.exports = { listAvailability, upsertAvailability, removeAvailability };
