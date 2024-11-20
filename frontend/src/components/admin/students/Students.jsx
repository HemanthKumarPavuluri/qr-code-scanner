import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Button, Title, Modal } from "@mantine/core";
import Cards from "./Cards";
import StudentDetails from "./StudentDetails";
import StudentForm from "./StudentForm";
import SelectCourseModal from "./SelectCourseModal";

import {
  fetchStudent,
  deleteStudent,
  assignCourseToStudent,
} from "../../../api/studentsApi";
import { fetchCourses } from "../../../api/coursesApi";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formStudent, setFormStudent] = useState(null);
  const [assignCoursesOpen, setAssignCoursesOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await fetchStudent();
        const coursesRes = await fetchCourses();
        setStudents(studentsRes);
        setCourses(coursesRes);
        if (studentsRes.length > 0) {
          setSelectedStudent(studentsRes[0]);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const openEditForm = (student) => {
    setFormOpen(true);
    setFormStudent(student);
  };

  const openAssignCourses = (student) => {
    setSelectedStudent(student);
    setAssignCoursesOpen(true);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteStudent(id);
      const updatedStudents = await fetchStudent();
      setStudents(updatedStudents);
      setSelectedStudent(
        updatedStudents.length > 0 ? updatedStudents[0] : null
      );
    } catch (err) {
      console.error("Failed to delete student", err);
    }
  };

  const handleAssignCourses = async (studentId, selectedCourses) => {
    try {
      for (let courseId of selectedCourses) {
        await assignCourseToStudent(studentId, courseId);
      }
      const updatedStudents = await fetchStudent();
      setStudents(updatedStudents);
      setSelectedStudent(updatedStudents.find((s) => s._id === studentId));
    } catch (err) {
      console.error("Failed to assign courses", err);
    } finally {
      setAssignCoursesOpen(false); // Ensure modal closes even if an error occurs
    }
  };

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormStudent(null); // Reset for adding a new student
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="md">
        <Box>
          <Title order={2}>Students</Title>
          <Title order={5}>Select a student to view details</Title>
        </Box>
        <Button size="lg" onClick={handleFormOpen}>
          Add Student
        </Button>
      </Flex>

      <Flex justify="center" gap={80} py={32}>
        {/* Cards Section */}
        <ScrollArea h={800} w="40%" type="never">
          <Cards
            students={students}
            courses={courses} // Pass complete courses array to Cards
            handleStudentClick={handleStudentClick}
            handleDelete={handleDelete}
            openEditForm={openEditForm}
            openAssignCourses={openAssignCourses}
          />
        </ScrollArea>

        {/* Details Section */}
        <ScrollArea h={800} w="40%" type="never">
          {selectedStudent ? (
            <StudentDetails data={selectedStudent} />
          ) : (
            <p>Select a student to view details</p>
          )}
        </ScrollArea>
      </Flex>

      {/* Modal for adding/editing a student */}
      <Modal
        opened={formOpen}
        onClose={() => setFormOpen(false)}
        title={formStudent ? "Edit Student" : "Add Student"}
      >
        <StudentForm
          student={formStudent}
          setStudents={setStudents}
          setFormOpen={setFormOpen}
        />
      </Modal>

      {/* Modal for assigning courses */}
      {assignCoursesOpen && (
        <SelectCourseModal
          open={assignCoursesOpen}
          setOpen={setAssignCoursesOpen}
          student={selectedStudent}
          courses={courses}
          handleUpdateStudent={(updatedStudent) => {
            const updatedStudents = students.map((s) =>
              s._id === updatedStudent._id ? updatedStudent : s
            );
            setStudents(updatedStudents);
            setSelectedStudent(updatedStudent);
          }}
          handleUpdateCourse={(updatedCourse) => {
            const updatedCourses = courses.map((c) =>
              c._id === updatedCourse._id ? updatedCourse : c
            );
            setCourses(updatedCourses);
          }}
        />
      )}
    </Box>
  );
};

export default Students;
