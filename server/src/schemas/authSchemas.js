const { z } = require('zod');

const registerSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, underscores'),
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(1).max(100).optional(),
});

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

module.exports = { registerSchema, loginSchema };
