const customMedicationsService = require('../services/customMedicationsService');

const list = async (req, res, next) => {
  try {
    const data = await customMedicationsService.listCustomMedications(req.user.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const upsertPatch = async (req, res, next) => {
  try {
    const { drugClass, drugName } = req.body;
    const data = await customMedicationsService.upsertPatch(req.user.userId, { drugClass, drugName });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createNewClass = async (req, res, next) => {
  try {
    const data = await customMedicationsService.createNewClass(req.user.userId, req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await customMedicationsService.deleteCustomMedication(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { list, upsertPatch, createNewClass, remove };
