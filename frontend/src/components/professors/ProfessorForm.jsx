import { useState, useEffect } from "react";
import { TextInput, Button, Box, Title, Flex } from "@mantine/core";

const ProfessorForm = ({ onSave, onCancel, initialValues = {} }) => {
  const [professor, setProfessor] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    office: "",
    qualification: "",
    designation: "",
    education: "",
    courses_taught: "",
    academic_interests: "",
  });

  // Fill the form with initial values when editing
  useEffect(() => {
    if (initialValues) {
      setProfessor({ ...initialValues });
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(professor); // Call onSave with the professor data
  };

  return (
    <Box>
      <Title order={3}>{initialValues ? "Edit Professor" : "Add New Professor"}</Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="md">
          <TextInput
            label="First Name"
            name="first_name"
            value={professor.first_name}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Last Name"
            name="last_name"
            value={professor.last_name}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Email"
            name="email"
            value={professor.email}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Phone"
            name="phone"
            value={professor.phone}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Office"
            name="office"
            value={professor.office}
            onChange={handleInputChange}
          />
          <TextInput
            label="Qualification"
            name="qualification"
            value={professor.qualification}
            onChange={handleInputChange}
          />
          <TextInput
            label="Designation"
            name="designation"
            value={professor.designation}
            onChange={handleInputChange}
          />
          <TextInput
            label="Education (comma separated)"
            name="education"
            value={professor.education}
            onChange={handleInputChange}
          />
          <TextInput
            label="Courses Taught (comma separated)"
            name="courses_taught"
            value={professor.courses_taught}
            onChange={handleInputChange}
          />
          <TextInput
            label="Academic Interests (comma separated)"
            name="academic_interests"
            value={professor.academic_interests}
            onChange={handleInputChange}
          />
          <Flex gap="md" justify="space-between">
            <Button type="submit">Save</Button>
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
