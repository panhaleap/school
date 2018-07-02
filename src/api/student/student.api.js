import { failed, succeed } from '../../common/response';
import { Student } from '../../models/student';

export const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, age, gender, scoreDetail } = req.body;
        const student = new Student({ firstName, lastName, age, gender, scoreDetail });
        const result = await student.save();
        if (result) succeed(res, result, 200);
        else failed(res, 'Couldn\'t create student', 500);
    } catch (error) {
        console.log(error);
        failed(res, error, 400);
    }
};

export const getStudentList = async (req, res) => {
    try {
        let { limit = 10, page = 1 } = req.query;
        limit = +limit;
        page = +page;
        const skip = limit * (page - 1);

        const [students, total] = await Promise.all([
            Student.find({ isActive: true }).skip(skip).limit(limit),
            Student.count({ isActive: true })
        ]);

        if (students) {
            succeed(res,{message: 'Success','Data': students,options: {limit,skip,total}}, 200);
        }
        else failed(res, 'Not Found', 404);
    } catch (error) {
        console.log(error);
        failed(res, error, 400);
    }
};
