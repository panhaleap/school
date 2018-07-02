import { failed, succeed } from '../../common/response';
import { Student } from '../../models/student';

const condiSearchByName = (filterByName) => {
    let wordSplit = { ...filterByName }.name.split(" ", 2);

    wordSplit.forEach((word, index, theArray) => { theArray[index] = new RegExp(`${word.trim()}`, "i"); });

    const twoWordCondition = {
        $or: [
            { $and: [{ firstName: wordSplit[0] }, { lastName: wordSplit[1] }] },
            { $and: [{ firstName: wordSplit[1] }, { lastName: wordSplit[0] }] }
        ]
    };

    const oneWordCondition = { $or: [{ firstName: wordSplit[0] }, { lastName: wordSplit[0] }] };
    return wordSplit.length < 2 ? oneWordCondition : twoWordCondition;
};

const getLimit = (limit) => {
    limit = +limit;
    return (limit > 100) ? 100 : limit;
};

const getSkip = (page, limit) => {
    page = +page;
    const skip = limit * (page - 1);
    return skip;
};

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
        let { limit = 10, page = 1, isActive, gender, name } = req.query;
        limit = getLimit(limit);
        const skip = getSkip(page, limit);

        const filterByActive = isActive ? { isActive } : { isActive: true };
        const filterByGender = gender ? { gender: { $in: gender } } : { gender: { $in: ["male", "female"] } };
        const filterByName = name ? { name } : {};
        const conditionByName = name ? condiSearchByName(filterByName) : {};

        const condition = { ...filterByActive, ...filterByGender };

        const [students, total] = await Promise.all([
            Student.find(conditionByName).find(condition)
                .skip(skip)
                .limit(limit),
            Student.count(conditionByName).count(condition)
        ]);

        if (students) succeed(res, { message: 'Success', 'Data': students, options: { limit, skip, total } }, 200);
        else failed(res, 'Not Found', 404);
    } catch (error) {
        console.log(error);
        failed(res, error, 400);
    }
};

export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findOne({ _id: id, isActive: true });
        if (student) succeed(res, { message: 'Success', 'Data': student }, 200);
        else failed(res, 'Not Found', 404);
    } catch (error) {
        console.log(error);
        failed(res, error, 400);
    }
};

export const updateStudentById = async () => {
    try {
        const { id } = req.params;
        const student = await Student.findOne({ _id: id, isActive: true });

    } catch (error) {
        console.log(error);
        failed(res, error, 400);
    }
};


////
router.route("/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findOneAndUpdate(
      { _id: id, isActive: true },
      { $set: { isActive: false } }
    );

    if (song !== null && song.isActive) {
      res.status(200).json({ message: "Song was deleted!" });
    } else {
      res.status(404).json({ message: "Song not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    debug(error);
  }
});