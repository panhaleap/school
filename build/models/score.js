'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreDetail = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const scoreDetailSchema = (0, _mongoose.Schema)({
  student: { type: _mongoose.Schema.Types.ObjectId, ref: 'Student' },
  subject: { type: _mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  score: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true }
}, { collection: 'Score' }, { timestamps: true });
const ScoreDetail = exports.ScoreDetail = _mongoose2.default.model('Score', scoreDetailSchema);
//# sourceMappingURL=score.js.map