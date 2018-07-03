'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _subject = require('./subject.api');

const endpoint = '/subjects/';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';

const subjectRoute = (0, _express.Router)();

subjectRoute.post(endpoint, _subject.createSubject);
subjectRoute.get(endpoint, _subject.getSubjectList);
subjectRoute.get(`${endpoint}:id`, _subject.getSubjectById);
subjectRoute.put(`${endpoint}:id`, _subject.updateSubjectById);
subjectRoute.delete(`${endpoint}:id`, _subject.deleteSubjectById);

exports.default = subjectRoute;
//# sourceMappingURL=subject.route.js.map