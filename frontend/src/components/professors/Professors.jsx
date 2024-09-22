import Cards from "./Cards";
import CardDetails from "./ProfessorDetails";
import { Flex } from "@mantine/core";
import { useState } from "react";

const Courses = () => {
  const professors = [
    {
      professor_id: "#919",
      image: "https://example.com/image.jpg",
      email: "professor.email@example.com",
      phone: "+1-123-456-7890",
      office: "Room 204, Science Building",
      first_name: "John",
      last_name: "Doe",
      qualification: "PhD in Computer Science",
      designation: "Associate Professor",
      education: [
        {
          degree: "PhD",
          field: "Computer Science",
          institution: "University of Example",
          year: 2015,
        },
        {
          degree: "MSc",
          field: "Information Technology",
          institution: "Tech University",
          year: 2010,
        },
        {
          degree: "BSc",
          field: "Computer Science",
          institution: "State University",
          year: 2008,
        },
      ],
      courses_taught: [
        "Introduction to Algorithms",
        "Data Structures",
        "Advanced Machine Learning",
      ],
      academic_interests: [
        "Artificial Intelligence",
        "Data Science",
        "Machine Learning",
        "Natural Language Processing",
      ],
    },
    {
      professor_id: "#919",
      image: "https://example.com/image.jpg",
      email: "professor.email@example.com",
      phone: "+1-123-456-7890",
      office: "Room 204, Science Building",
      first_name: "Mia",
      last_name: "Khalifa",
      qualification: "PhD in Computer Science",
      designation: "Associate Professor",
      education: [
        {
          degree: "PhD",
          field: "Computer Science",
          institution: "University of Example",
          year: 2015,
        },
        {
          degree: "MSc",
          field: "Information Technology",
          institution: "Tech University",
          year: 2010,
        },
        {
          degree: "BSc",
          field: "Computer Science",
          institution: "State University",
          year: 2008,
        },
      ],
      courses_taught: [
        "Introduction to Algorithms",
        "Data Structures",
        "Advanced Machine Learning",
      ],
      academic_interests: [
        "Artificial Intelligence",
        "Data Science",
        "Machine Learning",
        "Natural Language Processing",
      ],
    },
  ];

  const handleProfessorClick = (professor) => {
    setSelectedProfessor(professor);
  };

  const [selectedProfessor, setSelectedProfessor] = useState(professors[0]);

  return (
    <Flex>
      <Cards
        professors={professors}
        handleProfessorClick={handleProfessorClick}
      />
      <CardDetails data={selectedProfessor} />
    </Flex>
  );
};

export default Courses;
