'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _response = require('../../common/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const subjectCreatedSchema = Joi.object().keys({
//     firstName: Joi.string().alphanum().max(30).required(),
//     lastNam: Joi.string().alphanum().max(30).required()
// }).with('firstName', 'lastName');

// const subjectUpdatedSchema = Joi.object().keys({
//     firstName: Joi.string().alphanum().max(30),
//     lastNam: Joi.string().alphanum().max(30)
// }).with('firstName', 'lastName');

const subjectQuerySchema = _joi2.default.object().keys({
    limit: _joi2.default.number(),
    page: _joi2.default.number()
});

// export const checkCreatedSubject = (req, res, next) => {    
//     const { error } = Joi.valid(req.body, studentCreatedSchema);
//     if (error === null) {next();}
//     else {
//         console.log(error);
//         errorValidation(res, error, 422);}
// };

// export const checkQuerySubject = (req, res, next) => {
//     const { error } = Joi.validate(req.query, subjectQuerySchema);
//     if (error === null) next();
//     else errorValidation(res, { 'error': error.name, 'message': error.message }, 422);
// };
//# sourceMappingURL=teacher.middleware.js.map