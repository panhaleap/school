'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Teacher = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const teacherSchema = (0, _mongoose.Schema)({ firstName: String, lastName: String, gender: String, isActive: { type: Boolean, required: true, default: true } }, { collection: 'dlTeacher' }, { timestamps: true });
const Teacher = exports.Teacher = _mongoose2.default.model('Teacher', teacherSchema);
//# sourceMappingURL=teacher.js.map