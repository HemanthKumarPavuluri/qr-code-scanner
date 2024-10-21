import { useState, useEffect } from "react";
import { TextInput, Button, Box, Title, Flex } from "@mantine/core";
import { addCourse, fetchCourses, updateCourse } from "../../../api/coursesApi"; // API functions for courses
import { showNotification } from "@mantine/notifications";

const CourseForm = ({
  course,
  setCourses,
  setFormOpen,
  onCancel,
  handleUpdateCourse,
}) => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credits, setCredits] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [courseLevel, setCourseLevel] = useState([]);
  const [prerequisites, setPrerequisites] = useState(""); // Comma-separated string

  useEffect(() => {
    if (course) {
      setCourseName(course.course_name || "");
      setCourseCode(course.course_code || "");
      setCredits(course.credits || "");
      setDescription(course.description || "");
      setSemester(course.semester || "");
      setCourseLevel(course.degree_levels_available);
      setDepartment(course.department || "");
      setPrerequisites(
        course.prerequisites ? course.prerequisites.join(", ") : ""
      );
    } else {
      // Reset form for new course
      setCourseName("");
      setCourseCode("");
      setCredits("");
      setDescription("");
      setSemester("");
      setDepartment("");
      setPrerequisites("");
    }
  }, [course]);

  const handleAddCourse = async (newCourse) => {
    try {
      const addedCourse = await addCourse(newCourse);
      fetchCourses().then((res) => {
        setCourses(res);
        setFormOpen(false);
      });
      console.log("New Course added:", addedCourse);
    } catch (error) {
      console.error("Error adding course:", error);
      showNotification({
        title: "Error adding course",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the course data to be sent to the API
    const courseData = {
      course_name: courseName,
      course_code: courseCode,
      credits: credits,
      description: description,
      semester: semester,
      department: department,
      degree_levels_available: courseLevel,
      prerequisites: prerequisites.split(",").map((item) => item.trim()),
    };

    if (course && course._id) {
      handleUpdateCourse({ ...course, ...courseData });
    } else {
      handleAddCourse(courseData);
    }
  };

  return (
    <Box>
      <Title order={3}>{course ? "Edit Course" : "Add New Course"}</Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="md">
          <TextInput
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <TextInput
            label="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
          <TextInput
            label="Course Level"
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
          />
          <TextInput
            label="Credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            label="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
          <TextInput
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <TextInput
            label="Prerequisites (comma separated)"
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
          />

          <Flex gap="md" justify="space-between">
            <Button type="submit">
              {course ? "Update Course" : "Add Course"}
            </Button>
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default CourseForm;
