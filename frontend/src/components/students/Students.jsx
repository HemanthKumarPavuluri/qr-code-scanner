import React from "react";
import { SimpleGrid, Container, Title } from "@mantine/core";
import StudentDetails from "./StudentDetails";

// Mock student data
const studentsData = [
  {
    _id: "67030dfae2fe51d8e192af5e",
    student_id: "919234567",
    first_name: "Bhargavi",
    last_name: "Tatineni",
    courses_enrolled: [
      {
        course_id: "66fa0068ab8a99117dc87b3c",
        section_number: "001",
        professor_assigned: "Dr. Aziz Fellah",
        level: "Undergraduate",
      },
    ],
  },
  {
    _id: "67030dfae2fe51d8e192af5d",
    student_id: "918765432",
    first_name: "Ravi",
    last_name: "Kumar",
    courses_enrolled: [
      {
        course_id: "78fa0068ab8a99117dc87a2c",
        section_number: "002",
        professor_assigned: "Dr. Sarah Connor",
        level: "Undergraduate",
      },
    ],
  },
  // Add more students if needed
];

const Students = () => {
  return (
    <Container>
      <Title order={2} mb="lg">
        Students List
      </Title>

      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {studentsData.map((student) => (
          <StudentDetails key={student._id} student={student} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Students;
