'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constant = require('./common/constant');

var _student = require('./api/student/student.route');

var _student2 = _interopRequireDefault(_student);

var _subject = require('./api/subject/subject.route');

var _subject2 = _interopRequireDefault(_subject);

var _teacher = require('./api/teacher/teacher.route');

var _teacher2 = _interopRequireDefault(_teacher);

var _score = require('./api/score/score.route');

var _score2 = _interopRequireDefault(_score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const port = process.env.port || 8181;

_mongoose2.default.connect(_constant.CONNECTION);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
  next();
});

app.use(_constant.ENDPOINT, _student2.default);
app.use(_constant.ENDPOINT, _subject2.default);
app.use(_constant.ENDPOINT, _teacher2.default);
app.use(_constant.ENDPOINT, _score2.default);

app.listen(port, () => {
  console.log('Hello ^^');
});
//# sourceMappingURL=index.js.map