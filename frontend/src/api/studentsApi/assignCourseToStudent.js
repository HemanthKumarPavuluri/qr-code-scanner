import axios from "axios";

const assignCourseToStudent = async (studentId, courseId) => {
  const res = await axios.post("http://localhost:3001/assign-course-to-student", {
    studentId,
    courseId,
  });

  return res.data;
};

export default assignCourseToStudent;
