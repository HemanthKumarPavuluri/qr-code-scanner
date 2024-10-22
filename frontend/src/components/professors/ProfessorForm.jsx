import { useState, useEffect } from "react";
import { TextInput, Button, Box, Title, Flex } from "@mantine/core";
import {
  addProfessor,
  fetchProfessors,
  updateProfessor,
} from "../../../api/professorsApi"; // API functions for professors
import { showNotification } from "@mantine/notifications";

const ProfessorForm = ({ professor, setProfessors, setFormOpen, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [courses, setCourses] = useState("");

  useEffect(() => {
    if (professor) {
      setFirstName(professor.first_name || "");
      setLastName(professor.last_name || "");
      setProfessorId(professor.professor_id || "");
      setEmail(professor.email || "");
      setDepartment(professor.department || "");
      setCourses(professor.courses ? professor.courses.join(", ") : "");
    } else {
      // Reset form for a new professor
      setFirstName("");
      setLastName("");
      setProfessorId("");
      setEmail("");
      setDepartment("");
      setCourses("");
    }
  }, [professor]);

  const handleAddProfessor = async (newProfessor) => {
    try {
      await addProfessor(newProfessor);
      fetchProfessors().then((res) => {
        setProfessors(res);
        setFormOpen(false);
      });
    } catch (error) {
      showNotification({
        title: "Error adding professor",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleUpdateProfessor = async (updatedProfessor) => {
    try {
      await updateProfessor(updatedProfessor);
      fetchProfessors().then((res) => {
        setProfessors(res);
        setFormOpen(false);
      });
    } catch (error) {
      showNotification({
        title: "Error updating professor",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const professorData = {
      first_name: firstName,
      last_name: lastName,
      professor_id: professorId,
      email,
      department,
      courses: courses.split(",").map((course) => course.trim()),
    };

    if (professor && professor._id) {
      handleUpdateProfessor({ ...professor, ...professorData });
    } else {
      handleAddProfessor(professorData);
    }
  };

  return (
    <Box>
      <Title order={3}>{professor ? "Edit Professor" : "Add New Professor"}</Title>
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
            label="Professor ID"
            value={professorId}
            onChange={(e) => setProfessorId(e.target.value)}
            required
          />
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
          <TextInput
            label="Courses (comma separated)"
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
          />

          <Flex gap="md" justify="space-between">
            <Button type="submit">
              {professor ? "Update Professor" : "Add Professor"}
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

export default ProfessorForm;
