'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkQueryStudent = exports.checkCreatedStudent = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _response = require('../../common/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const studentCreatedSchema = _joi2.default.object().keys({
    firstName: _joi2.default.string().alphanum().max(30).required(),
    lastNam: _joi2.default.string().alphanum().max(30).required()
}).with('firstName', 'lastName');

const studentUpdatedSchema = _joi2.default.object().keys({
    firstName: _joi2.default.string().alphanum().max(30),
    lastNam: _joi2.default.string().alphanum().max(30)
}).with('firstName', 'lastName');

const studentQuerySchema = _joi2.default.object().keys({
    limit: _joi2.default.number(),
    page: _joi2.default.number()
});

const checkCreatedStudent = exports.checkCreatedStudent = (req, res, next) => {
    const { error } = _joi2.default.valid(req.body, studentCreatedSchema);
    if (error === null) {
        next();
    } else {
        console.log(error);
        (0, _response.errorValidation)(res, error, 422);
    }
};

const checkQueryStudent = exports.checkQueryStudent = (req, res, next) => {
    const { error } = _joi2.default.validate(req.query, studentQuerySchema);
    if (error === null) next();else (0, _response.errorValidation)(res, { 'error': error.name, 'message': error.message }, 422);
};
//# sourceMappingURL=student.middleware.js.map