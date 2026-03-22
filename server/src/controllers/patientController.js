const patientService = require('../services/patientService');
const {
  patientSchema,
  updatePatientSchema,
  imageUploadUrlSchema,
  imageMetaSchema,
} = require('../schemas/patientSchemas');

const list = async (req, res, next) => {
  try {
    const { search, page, limit, sort } = req.query;
    const result = await patientService.listPatients(req.user.userId, {
      search,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      sort,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const patient = await patientService.getPatient(req.user.userId, req.params.id);
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const body = patientSchema.parse(req.body);
    const patient = await patientService.createPatient(req.user.userId, body);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const body = updatePatientSchema.parse(req.body);
    const patient = await patientService.updatePatient(req.user.userId, req.params.id, body);
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await patientService.deletePatient(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const getUploadUrl = async (req, res, next) => {
  try {
    const { filename, mimeType } = imageUploadUrlSchema.parse(req.body);
    const result = await patientService.getSignedUploadUrl(
      req.user.userId,
      req.params.id,
      filename,
      mimeType
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const recordImage = async (req, res, next) => {
  try {
    const body = imageMetaSchema.parse(req.body);
    const image = await patientService.recordImage(req.user.userId, req.params.id, body);
    res.status(201).json(image);
  } catch (err) {
    next(err);
  }
};

const listImages = async (req, res, next) => {
  try {
    const images = await patientService.listImages(req.user.userId, req.params.id);
    res.json(images);
  } catch (err) {
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    await patientService.deleteImage(req.user.userId, req.params.id, req.params.imageId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { list, get, create, update, remove, getUploadUrl, recordImage, listImages, deleteImage };
