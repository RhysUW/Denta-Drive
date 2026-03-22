const templateService = require('../services/templateService');
const { templateSchema, updateTemplateSchema } = require('../schemas/templateSchemas');

const get = async (req, res, next) => {
  try {
    const data = await templateService.getTemplate(req.user.userId, req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const data = await templateService.listTemplates(req.user.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const body = templateSchema.parse(req.body);
    const data = await templateService.createTemplate(req.user.userId, body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const body = updateTemplateSchema.parse(req.body);
    const data = await templateService.updateTemplate(req.user.userId, req.params.id, body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await templateService.deleteTemplate(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { get, list, create, update, remove };