const availabilityService = require('../services/availabilityService');

const list = async (req, res, next) => {
  try {
    const data = await availabilityService.listAvailability(req.user.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const upsert = async (req, res, next) => {
  try {
    const { date, startTime, endTime } = req.body;
    const data = await availabilityService.upsertAvailability(req.user.userId, { date, startTime, endTime });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await availabilityService.removeAvailability(req.user.userId, req.params.date);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { list, upsert, remove };
