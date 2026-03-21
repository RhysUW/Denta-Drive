const { z } = require('zod');

const appointmentSchema = z.object({
  patient_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  appointment_at: z.string().datetime(),
  duration_mins: z.number().int().min(5).max(480).optional().default(60),
  notes: z.string().optional().nullable(),
  is_completed: z.boolean().optional().default(false),
});

const updateAppointmentSchema = appointmentSchema.partial().omit({ patient_id: true });

module.exports = { appointmentSchema, updateAppointmentSchema };
