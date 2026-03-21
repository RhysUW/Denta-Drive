const authService = require('../services/authService');
const { registerSchema, loginSchema } = require('../schemas/authSchemas');

const register = async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const result = await authService.register(body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const result = await authService.login(body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, me };
