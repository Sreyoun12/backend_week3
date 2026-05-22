import express from 'express';
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';
import courses from './course.js';

const app = express();
const PORT = 3000;

app.use(logger);

app.get('/departments/:dept/courses', auth, validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filteredCourses = courses.filter(course => course.department.toLowerCase() === dept.toLowerCase());

    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level.toLowerCase() === level.toLowerCase());
    }

    if (minCredits !== undefined) {
        filteredCourses = filteredCourses.filter(course => course.credits >= Number(minCredits));
    }

    if (maxCredits !== undefined) {
        filteredCourses = filteredCourses.filter(course => course.credits <= Number(maxCredits));
    }

    if (semester) {
        filteredCourses = filteredCourses.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
    }

    if (instructor) {
        filteredCourses = filteredCourses.filter(course => course.instructor.toLowerCase().includes(instructor.toLowerCase()));
    }

    res.json(filteredCourses);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
