'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteStudentById = exports.updateStudentById = exports.getStudentById = exports.getStudentList = exports.createStudent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _response = require('../../common/response');

var _student = require('../../models/student');

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

const createStudent = exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, scoreDetail } = req.body;
    const student = new _student.Student({ firstName, lastName, age, gender, scoreDetail });
    const result = await student.save();
    if (result) (0, _response.succeed)(res, result, 200);else (0, _response.failed)(res, "Couldn't create student", 500);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getStudentList = exports.getStudentList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive, gender, name } = req.query;
    console.log(name);
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const filterByGender = gender ? { gender: { $in: gender } } : { gender: { $in: ['male', 'female'] } };
    console.log(filterByGender);
    const filterByName = name ? { name } : {};
    const conditionByName = name ? condiSearchByName(filterByName) : {};

    const condition = _extends({}, filterByActive, filterByGender);

    const [students, total] = await Promise.all([_student.Student.find(conditionByName).find(condition).skip(skip).limit(limit), _student.Student.count(conditionByName).count(condition)]);

    if (students) (0, _response.succeed)(res, { message: 'Success', Data: students, options: { limit, skip, total } }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getStudentById = exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await _student.Student.findOne({ _id: id, isActive: true });
    if (student) (0, _response.succeed)(res, { message: 'Success', Data: student }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const updateStudentById = exports.updateStudentById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const student = await _student.Student.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (student) (0, _response.succeed)(res, { message: 'Updated Sucess', Data: student }, 200);else (0, _response.failed)(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const deleteStudentById = exports.deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await _student.Student.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    if (student) (0, _response.succeed)(res, { message: 'Deleted Sucess' }, 200);else (0, _response.failed)(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};
//# sourceMappingURL=student.api.js.map