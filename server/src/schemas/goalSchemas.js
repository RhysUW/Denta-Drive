const { z } = require('zod');

const goalSchema = z.object({
  title: z.string().min(1).max(200),
  target_count: z.number().int().min(1),
  current_count: z.number().int().min(0).optional().default(0),
  semester: z.string().min(1).max(20),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().default('#6366f1'),
});

const updateGoalSchema = goalSchema.partial();

module.exports = { goalSchema, updateGoalSchema };
