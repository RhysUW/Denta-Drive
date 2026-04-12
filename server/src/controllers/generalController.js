const generalService = require('../services/generalService');

const listCategories = async (req, res, next) => {
  try {
    const data = await generalService.listCategories(req.user.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, colour } = req.body;
    const data = await generalService.createCategory(req.user.userId, { name, colour });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, colour } = req.body;
    const data = await generalService.updateCategory(req.user.userId, req.params.id, { name, colour });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await generalService.deleteCategory(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const addEntry = async (req, res, next) => {
  try {
    const data = await generalService.addEntry(req.user.userId, req.params.id, req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateEntry = async (req, res, next) => {
  try {
    const data = await generalService.updateEntry(req.user.userId, req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteEntry = async (req, res, next) => {
  try {
    await generalService.deleteEntry(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { listCategories, createCategory, updateCategory, deleteCategory, addEntry, updateEntry, deleteEntry };
