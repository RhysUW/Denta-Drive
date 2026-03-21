const appointmentService = require('../services/appointmentService');
const { appointmentSchema, updateAppointmentSchema } = require('../schemas/appointmentSchemas');

const list = async (req, res, next) => {
  try {
    const { start, end, patient_id } = req.query;
    const data = await appointmentService.listAppointments(req.user.userId, { start, end, patient_id });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const body = appointmentSchema.parse(req.body);
    const data = await appointmentService.createAppointment(req.user.userId, body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const body = updateAppointmentSchema.parse(req.body);
    const data = await appointmentService.updateAppointment(req.user.userId, req.params.id, body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await appointmentService.deleteAppointment(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { list, create, update, remove };
