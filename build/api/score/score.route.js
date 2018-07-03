'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _score = require('./score.api');

const endpoint = '/scores/';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';

const scoreRoute = (0, _express.Router)();

scoreRoute.post(endpoint, _score.createScore);
scoreRoute.get(endpoint, _score.getScoretList);
scoreRoute.get(`${endpoint}:id`, _score.getScoreById);
scoreRoute.put(`${endpoint}:id`, _score.updateScoreById);
scoreRoute.delete(`${endpoint}:id`, _score.deleteScoreById);

exports.default = scoreRoute;
//# sourceMappingURL=score.route.js.map