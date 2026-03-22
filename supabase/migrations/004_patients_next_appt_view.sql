-- View: patients with their next upcoming appointment date
CREATE OR REPLACE VIEW patients_with_next_appt AS
SELECT
  p.*,
  MIN(a.appointment_at) FILTER (
    WHERE a.appointment_at > NOW() AND a.is_completed = false
  ) AS next_appointment_at
FROM patients p
LEFT JOIN appointments a ON a.patient_id = p.id
GROUP BY p.id;