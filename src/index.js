'use strict';

import expresses from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { CONNECTION, ENDPOINT } from './common/constant';
import studentRoute from './api/student/student.route';
import subjectRoute from './api/subject/subject.route';
import teacherRoute from './api/teacher/teacher.route';

const app = expresses();
const port = process.env.port || 8181;

mongoose.connect(CONNECTION);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
    next();
  });

  app.use(ENDPOINT, studentRoute);
  app.use(ENDPOINT, subjectRoute);
  app.use(ENDPOINT, teacherRoute);

  app.listen(port, ()=>{
    console.log('Hello ^^');
  });
 