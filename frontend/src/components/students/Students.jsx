import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Title, Button, Modal } from "@mantine/core";
import Cards from "./Cards";
import StudentDetails from "./StudentDetails"; // Component for displaying student details
import StudentForm from "./StudentForm"; // Form for adding/editing students
import { fetchStudent, deleteStudent } from "../../api/studentsApi"; // API functions for students

const Students = () => {
  const [students, setStudents] = useState([]); // State for students
  const [selectedStudent, setSelectedStudent] = useState(undefined); // State for selected student
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false); // State for modal open/close
  const [formStudent, setFormStudent] = useState(null); // State for prefilled student details

  // Fetch students data when the component loads
  useEffect(() => {
    fetchStudent()
      .then((res) => {
        setStudents(res);
        if (res.length > 0) {
          setSelectedStudent(res[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch students. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Handle student selection
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  // Function to open the form with prefilled details for editing
  const openEditForm = (student) => {
    setFormOpen(true);
    setFormStudent(student); // Prefill form with selected student data
  };

  // Handle deleting a student
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteStudent(id);
    console.log("Successfully deleted the student");
    fetchStudents().then((res) => {
      setStudents(res);
      if (res.length > 0) {
        setSelectedStudent(res[0]);
      }
    });
  };

  // Handle opening the form for adding a new student
  const handleFormOpen = () => {
    setFormOpen(true);
    setFormStudent(null); // Reset for adding a new student
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box>
      <Flex justify={"space-between"}>
        <Box>
          <Title order={2}>Students</Title>
          <Title order={5}>Select a student to view details</Title>
        </Box>
        <Button size="lg" m={16} onClick={() => handleFormOpen()}>
          Add Student
        </Button>
      </Flex>
      <Flex justify="center" gap={80} py={32}>
        {/* Cards Section */}
        <ScrollArea h={"800"} w="40%" type="never">
          <Cards
            students={students} // Passing students data to StudentCards
            selectedStudent={selectedStudent}
            handleStudentClick={handleStudentClick} // Handle student selection
            handleDelete={handleDelete} // Handle student deletion
            openEditForm={openEditForm} // Open form for editing
          />
        </ScrollArea>

        {/* Details Section */}
        <ScrollArea h={"800"} w="40%" type="never">
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
          student={formStudent} // Pass the student to the form for editing
          setStudents={setStudents} // Update students list after form submission
          setFormOpen={setFormOpen} // Close form after submission
        />
      </Modal>
    </Box>
  );
};

export default Students;
