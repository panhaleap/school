'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStudentList = exports.createStudent = undefined;

var _response = require('../../common/response');

var _student = require('../../models/student');

const createStudent = exports.createStudent = async (req, res) => {
    try {
        const { firstName, lastName, age, gender, scoreDetail } = req.body;
        const student = new _student.Student({ firstName, lastName, age, gender, scoreDetail });
        const result = await student.save();
        if (result) (0, _response.succeed)(res, result, 200);else (0, _response.failed)(res, 'Couldn\'t create student', 500);
    } catch (error) {
        console.log(error);
        (0, _response.failed)(res, error, 400);
    }
};

const getStudentList = exports.getStudentList = async (req, res) => {
    try {
        let { limit = 10, page = 1 } = req.query;
        limit = +limit;
        page = +page;
        const skip = limit * (page - 1);

        const [students, total] = await Promise.all([_student.Student.find({ isActive: true }).skip(skip).limit(limit), _student.Student.count({ isActive: true })]);

        if (students) {
            (0, _response.succeed)(res, { message: 'Success', 'Data': students, options: { limit, skip, total } }, 200);
        } else (0, _response.failed)(res, 'Not Found', 404);
    } catch (error) {
        console.log(error);
        (0, _response.failed)(res, error, 400);
    }
};
//# sourceMappingURL=student.api.js.map