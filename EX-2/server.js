// server.js
import express from 'express';
import course from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    const min = minCredits !== undefined && minCredits !== '' ? Number(minCredits) : null;
    const max = maxCredits !== undefined && maxCredits !== '' ? Number(maxCredits) : null;

    const isMinValidNum = min !== null && !Number.isNaN(min);
    const isMaxValidNum = max !== null && !Number.isNaN(max);
    if (isMinValidNum && isMaxValidNum && min > max) {
        return res.status(400).json({ 
            error: 'Invalid credit range: minCredits cannot be greater than maxCredits' 
        });
    }

    let filteredCourses = course.filter(course => course.department.toLowerCase() === dept.toLowerCase());

    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level.toLowerCase() === level.toLowerCase());
    }

    if (isMinValidNum) {
        filteredCourses = filteredCourses.filter(course => course.credits >= min);
    }

    if (isMaxValidNum) {
        filteredCourses = filteredCourses.filter(course => course.credits <= max);
    }

    if (semester) {
        filteredCourses = filteredCourses.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
    }

    if (instructor) {
        filteredCourses = filteredCourses.filter(course => course.instructor.toLowerCase().includes(instructor.toLowerCase()));
    }

    return res.json(filteredCourses);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
