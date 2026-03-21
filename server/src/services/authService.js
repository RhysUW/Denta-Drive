const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/db');

const register = async ({ username, email, password, full_name }) => {
  // Check existing username
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .or(`username.eq.${username},email.eq.${email}`)
    .single();

  if (existing) {
    const err = new Error('Username or email already taken');
    err.status = 409;
    throw err;
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const { data: user, error } = await supabase
    .from('users')
    .insert({ username, email, password_hash, full_name })
    .select('id, username, email, full_name, created_at')
    .single();

  if (error) throw error;

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return { token, user };
};

const login = async ({ username, password }) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, email, full_name, password_hash, created_at')
    .or(`username.eq.${username},email.eq.${username}`)
    .single();

  if (error || !user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const { password_hash: _, ...userWithoutHash } = user;
  return { token, user: userWithoutHash };
};

const getMe = async (userId) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, email, full_name, created_at')
    .eq('id', userId)
    .single();

  if (error || !user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  return user;
};

module.exports = { register, login, getMe };
