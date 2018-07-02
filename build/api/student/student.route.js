'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _student = require('./student.middleware');

var _student2 = require('./student.api');

const endpoint = '/students';
const studentRoute = (0, _express.Router)();

//studentRoute.post(endpoint, checkCreatedStudent, createStudent);
studentRoute.post(endpoint, _student2.createStudent);
// studentRoute.get(endpoint, checkQueryStudent, getStudentList);
studentRoute.get(endpoint, _student2.getStudentList);

exports.default = studentRoute;
//# sourceMappingURL=student.route.js.map