import { failed, succeed } from '../../common/response';
import { Student } from '../../models/student';
import { Score } from '../../models/score';

const condiSearchByName = filterByName => {
  let wordSplit = { ...filterByName }.name.split(' ', 2);

  wordSplit.forEach((word, index, theArray) => {
    theArray[index] = new RegExp(`${word.trim()}`, 'i');
  });

  const twoWordCondition = {
    $or: [
      { $and: [{ firstName: wordSplit[0] }, { lastName: wordSplit[1] }] },
      { $and: [{ firstName: wordSplit[1] }, { lastName: wordSplit[0] }] }
    ]
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

export const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, scoreDetail } = req.body;
    const student = new Student({ firstName, lastName, age, gender, scoreDetail });
    const result = await student.save();
    if (result) succeed(res, result, 200);
    else failed(res, "Couldn't create student", 500);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getStudentList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive, gender, name } = req.query;
    console.log(name);
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const filterByGender = gender ? { gender: { $in: gender } } : { gender: { $in: ['male', 'female'] } };
    console.log(filterByGender);
    const filterByName = name ? { name } : {};
    const conditionByName = name ? condiSearchByName(filterByName) : {};

    const condition = { ...filterByActive, ...filterByGender };

    const [students, total] = await Promise.all([
      Student.find(conditionByName)
        .find(condition)
        .skip(skip)
        .limit(limit),
      Student.count(conditionByName).count(condition)
    ]);

    if (students) succeed(res, { message: 'Success', Data: students, options: { limit, skip, total } }, 200);
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
    if (student) succeed(res, { message: 'Success', Data: student }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const student = await Student.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (student) succeed(res, { message: 'Updated Sucess', Data: student }, 200);
    else failed(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    if (student) succeed(res, { message: 'Deleted Sucess' }, 200);
    else failed(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const createScoresForStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { scores } = req.body;
    //     if (result) succeed(res, { message: 'Created Success', Data: result }, 200);
    //     else failed(res, "Couldn't create subject", 500);
     
    // const student = await Student.findOneAndUpdate({ _id: id, isActive: true }, { $set: { scores } });

    const student = await Student.where({ _id: id, isActive: true }).findOne();
    student.scores.push(scores);
    student.save();

    if (student) {
      succeed(res, { message: 'Created Scores', data: student });
    } else {
      failed(res,  "Erorr while try to create score without any docs :D");
    }
  } catch (error) {
    console.log(error);
    failed(res, error, 500);
  }
 };
 
