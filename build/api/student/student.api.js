'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStudentById = exports.getStudentList = exports.createStudent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _response = require('../../common/response');

var _student = require('../../models/student');

const condiSearchByName = filterByName => {
    let wordSplit = _extends({}, filterByName).name.split(" ", 2);

    wordSplit.forEach((word, index, theArray) => {
        theArray[index] = new RegExp(`${word.trim()}`, "i");
    });

    const twoWordCondition = {
        $or: [{ $and: [{ firstName: wordSplit[0] }, { lastName: wordSplit[1] }] }, { $and: [{ firstName: wordSplit[1] }, { lastName: wordSplit[0] }] }]
    };

    const oneWordCondition = { $or: [{ firstName: wordSplit[0] }, { lastName: wordSplit[0] }] };
    return wordSplit.length < 2 ? oneWordCondition : twoWordCondition;
};

const getLimit = limit => {
    limit = +limit;
    return limit > 100 ? 100 : limit;
};

const getSkip = (page, limit) => {
    page = +page;
    const skip = limit * (page - 1);
    return skip;
};

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
        let { limit = 10, page = 1, isActive, gender, name } = req.query;
        limit = getLimit(limit);
        const skip = getSkip(page, limit);

        const filterByActive = isActive ? { isActive } : { isActive: true };
        const filterByGender = gender ? { gender: { $in: gender } } : { gender: { $in: ["male", "female"] } };
        const filterByName = name ? { name } : {};
        const conditionByName = name ? condiSearchByName(filterByName) : {};

        const condition = _extends({}, filterByActive, filterByGender);

        const [students, total] = await Promise.all([_student.Student.find(conditionByName).find(condition).skip(skip).limit(limit), _student.Student.count(conditionByName).count(condition)]);

        if (students) (0, _response.succeed)(res, { message: 'Success', 'Data': students, options: { limit, skip, total } }, 200);else (0, _response.failed)(res, 'Not Found', 404);
    } catch (error) {
        console.log(error);
        (0, _response.failed)(res, error, 400);
    }
};

const getStudentById = exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await _student.Student.findOne({ _id: id, isActive: true });
        if (student) (0, _response.succeed)(res, { message: 'Success', 'Data': student }, 200);else (0, _response.failed)(res, 'Not Found', 404);
    } catch (error) {
        console.log(error);
        (0, _response.failed)(res, error, 400);
    }
};

//
// router.route("/singers/:id").get(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const singer = await Singer.findOne({ _id: id, isActive: true });
//       if (!singer) {
//         res.status(404).json({ message: "Singer not found" });
//       } else {
//         res.status(200).json({ message: "Found", "Data": singer });
//       }
//     } catch (error) {
//       const msgError = (error.name == 'CastError') ? 'Wrong id format' : error;
//       res.status(500).json(msgError);
//     }
//   });
//# sourceMappingURL=student.api.js.map