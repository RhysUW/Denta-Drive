const { z } = require('zod');

const patientSchema = z.object({
  temp_number: z.string().min(1, 'Temp number is required').max(50),
  name: z.string().min(1).max(200),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  contact: z.string().max(50).optional().nullable(),
  health_conditions: z.array(z.string()).optional().default([]),
  current_medications: z.array(z.string()).optional().default([]),
  allergies: z.array(z.string()).optional().default([]),
  remarks:        z.string().optional().nullable(),
  my_notes:       z.string().optional().nullable(),
  previous_notes: z.string().optional().nullable(),
});

const updatePatientSchema = patientSchema.partial();

const imageUploadUrlSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().regex(/^image\//),
});

const imageMetaSchema = z.object({
  storagePath: z.string().min(1),
  filename: z.string().min(1),
  mimeType: z.string().optional(),
});

module.exports = { patientSchema, updatePatientSchema, imageUploadUrlSchema, imageMetaSchema };
