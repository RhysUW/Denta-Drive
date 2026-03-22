const { z } = require('zod');

const templateSchema = z.object({
  name:    z.string().min(1).max(200),
  content: z.string().min(1),
});

const updateTemplateSchema = templateSchema.partial();

module.exports = { templateSchema, updateTemplateSchema };