import { Router } from 'express';
import { checkCreatedStudent, checkQueryStudent } from './student.middleware';
import { getStudentList, createStudent } from './student.api'

const endpoint = '/students';
const studentRoute = Router();

//studentRoute.post(endpoint, checkCreatedStudent, createStudent);
studentRoute.post(endpoint, createStudent);
// studentRoute.get(endpoint, checkQueryStudent, getStudentList);
studentRoute.get(endpoint, getStudentList);

export default studentRoute;