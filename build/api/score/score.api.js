'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteScoreById = exports.updateScoreById = exports.getScoreById = exports.getScoretList = exports.createScore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _response = require('../../common/response');

var _score = require('../../models/score');

const getLimit = limit => {
  limit = +limit;
  return limit > 100 ? 100 : limit;
};

const getSkip = (page, limit) => {
  page = +page;
  const skip = limit * (page - 1);
  return skip;
};

//This one is correct
// export const createScore = async (req, res) => {
//   try {
//     const { student, subject, score } = req.body;
//     const scoreModel = new Score({ student, subject, score });
//     const result = await scoreModel.save();
//     if (result) succeed(res, { message: 'Created Success', Data: result }, 200);
//     else failed(res, "Couldn't create subject", 500);
//   } catch (error) {
//     console.log(error);
//     failed(res, error, 400);
//   }
// };

const createScore = exports.createScore = async (req, res) => {
  try {
    const { student, subject, score } = req.body;
    console.log(req.query.score);
    return res.status(200).json(score);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getScoretList = exports.getScoretList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive } = req.query;
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const condition = _extends({}, filterByActive);

    const [scoreModels, total] = await Promise.all([_score.Score.find(condition).populate({ path: 'student', select: '-_id firstName lastName' }).populate({ path: 'subject', select: '-_id name' }).skip(skip).limit(limit), _score.Score.count(condition)]);

    if (scoreModels) (0, _response.succeed)(res, { message: 'Success', Data: scoreModels, options: { limit, skip, total } }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getScoreById = exports.getScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const scoreModel = await _score.Score.findOne({ _id: id, isActive: true }).populate({ path: 'student', select: '-_id firstName lastName' }).populate({ path: 'subject', select: '-_id name' });
    if (scoreModel) (0, _response.succeed)(res, { message: 'Success', Data: scoreModel }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const updateScoreById = exports.updateScoreById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const scoreModel = await _score.Score.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (scoreModel) (0, _response.succeed)(res, { message: 'Updated Sucess', Data: scoreModel }, 200);else (0, _response.failed)(res, { message: 'Score not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const deleteScoreById = exports.deleteScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const scoreModel = await _score.Score.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    if (scoreModel) (0, _response.succeed)(res, { message: 'Deleted Sucess' }, 200);else (0, _response.failed)(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};
//# sourceMappingURL=score.api.js.map