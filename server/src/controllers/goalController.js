const goalService = require('../services/goalService');
const { goalSchema, updateGoalSchema } = require('../schemas/goalSchemas');

const list = async (req, res, next) => {
  try {
    const { semester } = req.query;
    const data = await goalService.listGoals(req.user.userId, semester);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const body = goalSchema.parse(req.body);
    const data = await goalService.createGoal(req.user.userId, body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const body = updateGoalSchema.parse(req.body);
    const data = await goalService.updateGoal(req.user.userId, req.params.id, body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await goalService.deleteGoal(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { list, create, update, remove };
