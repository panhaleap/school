'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _teacher = require('./teacher.api');

const endpoint = '/teachers/';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';

const teacherRoute = (0, _express.Router)();

teacherRoute.post(endpoint, _teacher.createTeacher);
teacherRoute.get(endpoint, _teacher.getTeacherList);
teacherRoute.get(`${endpoint}:id`, _teacher.getTeacherById);
teacherRoute.put(`${endpoint}:id`, _teacher.updateTeacherById);
teacherRoute.delete(`${endpoint}:id`, _teacher.deleteTeacherById);

exports.default = teacherRoute;
//# sourceMappingURL=teacher.route.js.map