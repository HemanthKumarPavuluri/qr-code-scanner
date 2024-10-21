import { useState, useEffect } from "react";
import { TextInput, Button, Box, Title, Flex } from "@mantine/core";
import {
  addStudent,
  fetchStudent,
  updateStudent,
} from "../../../api/studentsApi"; // API functions for students
import { showNotification } from "@mantine/notifications";

const StudentForm = ({ student, setStudents, setFormOpen, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState("");
  const [level, setLevel] = useState("");
  const [section, setSection] = useState("");
  const [professor, setProfessor] = useState(""); // Professor assigned to the student

  useEffect(() => {
    if (student) {
      setFirstName(student.first_name || "");
      setLastName(student.last_name || "");
      setStudentId(student.student_id || "");
      setEmail(student.email || "");
      setCourses(student.courses ? student.courses.join(", ") : "");
      setLevel(student.level || "");
      setSection(student.section || "");
      setProfessor(student.professor || "");
    } else {
      // Reset form for a new student
      setFirstName("");
      setLastName("");
      setStudentId("");
      setEmail("");
      setCourses("");
      setLevel("");
      setSection("");
      setProfessor("");
    }
  }, [student]);

  const handleAddStudent = async (newStudent) => {
    try {
      const addedStudent = await addStudent(newStudent);
      fetchStudents().then((res) => {
        setStudents(res);
        setFormOpen(false);
      });
      console.log("New Student added:", addedStudent);
    } catch (error) {
      console.error("Error adding student:", error);
      showNotification({
        title: "Error adding student",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      await updateStudent(updatedStudent);
      fetchStudents().then((res) => {
        setStudents(res);
        setFormOpen(false);
      });
    } catch (error) {
      console.error("Error updating student:", error);
      showNotification({
        title: "Error updating student",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the student data to be sent to the API
    const studentData = {
      first_name: firstName,
      last_name: lastName,
      student_id: studentId,
      email: email,
      courses: courses.split(",").map((course) => course.trim()),
      level: level,
      section: section,
      professor: professor,
    };

    if (student && student._id) {
      handleUpdateStudent({ ...student, ...studentData });
    } else {
      handleAddStudent(studentData);
    }
  };

  return (
    <Box>
      <Title order={3}>{student ? "Edit Student" : "Add New Student"}</Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="md">
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextInput
            label="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Courses (comma separated)"
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
          />
          <TextInput
            label="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          <TextInput
            label="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
          <TextInput
            label="Professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />

          <Flex gap="md" justify="space-between">
            <Button type="submit">
              {student ? "Update Student" : "Add Student"}
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

export default StudentForm;
