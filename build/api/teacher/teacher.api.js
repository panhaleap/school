'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTeacherById = exports.updateTeacherById = exports.getTeacherById = exports.getTeacherList = exports.createTeacher = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _response = require('../../common/response');

var _teacher = require('../../models/teacher');

const condiSearchByName = filterByName => {
  let wordSplit = _extends({}, filterByName).name.split(' ', 2);

  wordSplit.forEach((word, index, theArray) => {
    theArray[index] = new RegExp(`${word.trim()}`, 'i');
  });

  const twoWordCondition = {
    $or: [{ $and: [{ firstName: wordSplit[0] }, { lastName: wordSplit[1] }] }, { $and: [{ firstName: wordSplit[1] }, { lastName: wordSplit[0] }] }]
  };

  const oneWordCondition = { $or: [{ firstName: wordSplit[0] }, { lastName: wordSplit[0] }] };
  return wordSplit.length < 2 ? oneWordCondition : twoWordCondition;
};

const getLimit = limit => {
  limit = +limit;
  return limit > 100 ? 100 : limit;
};

const getSkip = (page, limit) => {
  page = +page;
  const skip = limit * (page - 1);
  return skip;
};

const createTeacher = exports.createTeacher = async (req, res) => {
  try {
    const { firstName, lastName, gender } = req.body;
    const teacher = new _teacher.Teacher({ firstName, lastName, gender });
    const result = await teacher.save();
    if (result) (0, _response.succeed)(res, result, 200);else (0, _response.failed)(res, "Couldn't create teacher", 500);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getTeacherList = exports.getTeacherList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive, gender, name } = req.query;
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const filterByGender = gender ? { gender: { $in: gender } } : { gender: { $in: ['male', 'female'] } };
    const filterByName = name ? { name } : {};
    const conditionByName = name ? condiSearchByName(filterByName) : {};

    const condition = _extends({}, filterByActive, filterByGender);

    const [teachers, total] = await Promise.all([_teacher.Teacher.find(conditionByName).find(condition).skip(skip).limit(limit), _teacher.Teacher.count(conditionByName).count(condition)]);

    if (teachers) (0, _response.succeed)(res, { message: 'Success', Data: teachers, options: { limit, skip, total } }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getTeacherById = exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await _teacher.Teacher.findOne({ _id: id, isActive: true });
    if (teacher) (0, _response.succeed)(res, { message: 'Success', Data: teacher }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const updateTeacherById = exports.updateTeacherById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const teacher = await _teacher.Teacher.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (teacher) (0, _response.succeed)(res, { message: 'Updated Sucess', Data: teacher }, 200);else (0, _response.failed)(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const deleteTeacherById = exports.deleteTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await _teacher.Teacher.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    if (teacher) (0, _response.succeed)(res, { message: 'Deleted Sucess' }, 200);else (0, _response.failed)(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};
//# sourceMappingURL=teacher.api.js.map