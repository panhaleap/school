'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSubjectById = exports.updateSubjectById = exports.getSubjectById = exports.getSubjectList = exports.createSubject = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _response = require('../../common/response');

var _subject = require('../../models/subject');

const getLimit = limit => {
  limit = +limit;
  return limit > 100 ? 100 : limit;
};

const getSkip = (page, limit) => {
  page = +page;
  const skip = limit * (page - 1);
  return skip;
};

const getFilterName = queryName => {
  let filterByName;
  if (queryName) {
    const regExpName = new RegExp(`${queryName.trim()}`, 'i');
    filterByName = { name: regExpName };
  } else {
    filterByName = {};
  }
  return filterByName;
};

const createSubject = exports.createSubject = async (req, res) => {
  try {
    const { name, teacher } = req.body;
    const subject = new _subject.Subject({ name, teacher });
    const result = await subject.save();
    if (result) (0, _response.succeed)(res, { message: 'Created Success', Data: result }, 200);else (0, _response.failed)(res, "Couldn't create subject", 500);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getSubjectList = exports.getSubjectList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive, name } = req.query;
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const filterByName = getFilterName(name);
    console.log(filterByName);
    const condition = _extends({}, filterByActive, filterByName);

    const [subjects, total] = await Promise.all([_subject.Subject.find(condition).skip(skip).limit(limit), _subject.Subject.count(condition)]);

    if (subjects) (0, _response.succeed)(res, { message: 'Success', Data: subjects, options: { limit, skip, total } }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const getSubjectById = exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await _subject.Subject.findOne({ _id: id, isActive: true });
    if (subject) (0, _response.succeed)(res, { message: 'Success', Data: subject }, 200);else (0, _response.failed)(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const updateSubjectById = exports.updateSubjectById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const subject = await _subject.Subject.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (subject) (0, _response.succeed)(res, { message: 'Updated Sucess', Data: subject }, 200);else (0, _response.failed)(res, { message: 'Subject not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};

const deleteSubjectById = exports.deleteSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await _subject.Subject.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    console.log(subject);
    if (subject) (0, _response.succeed)(res, { message: 'Deleted Sucess' }, 200);else (0, _response.failed)(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    (0, _response.failed)(res, error, 400);
  }
};
//# sourceMappingURL=subject.api.js.map