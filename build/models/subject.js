'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subject = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subjectSchema = (0, _mongoose.Schema)({ name: String, teacher: { type: _mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, isActive: { type: Boolean, required: true, default: true } }, { collection: 'dlSubject' }, { timestamps: true });
const Subject = exports.Subject = _mongoose2.default.model('Subject', subjectSchema);
//# sourceMappingURL=subject.js.map