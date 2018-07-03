'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Student = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  age: { type: Number, required: true },
  gender: String,
  scoreDetail: [{ type: Schema.Types.ObjectId, ref: 'ScoreDetail' }],
  isActive: { type: Boolean, required: true, default: true }
}, { collection: 'Student' }, { timestamps: true });

const Student = exports.Student = _mongoose2.default.model('Student', studentSchema);
//# sourceMappingURL=student.js.map