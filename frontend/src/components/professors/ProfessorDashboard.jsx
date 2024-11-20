import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Title, Button, Modal } from "@mantine/core";
import Cards from "./Cards"; // A component similar to Students' Cards
import ProfessorDetails from "./ProfessorDetails"; // Component for displaying professor details
import ProfessorForm from "./ProfessorForm"; // Form for adding/editing professors
import { fetchProfessors, deleteProfessor } from "../../api/professorApi"; // API functions for professors
import { fetchCourses } from "../../api/coursesApi"; // API functions for professors
import { useStore } from "../../store/useStore";

const ProfessorDashboard = () => {
  const { professorID } = useStore();
  const [professor, setProfessor] = useState({});
  const [courses, setCourses] = useState([]);

  // Fetch professors data when the component loads
  useEffect(() => {
    fetchProfessors().then((res) => {
      const prof = res.filter((i) => i._id === professorID)?.[0];
      setProfessor(prof);
      fetchCourses().then((res) => {
        const cours = res.filter((c) => prof.courses?.includes(c._id));
        setCourses(cours);
      });
    });
  }, [professorID]);


  return (
    <>
      <ProfessorDetails data={professor} />
  
      {/* Section Title with Buttons Side-by-Side */}
      <Flex justify="space-between" align="center" mt="xl" mb="md">
        <Title order={4}>All Teaching Courses</Title>
        <Flex gap="sm"> {/* Wrapper for side-by-side buttons */}
          <Button
            component="a"
            href="https://professor-student-records.onrender.com/"
            target="_blank" // Open in a new tab
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            size="md"
            radius="xl"
          >
            View Students Records
          </Button>
          <Button
            component="a"
            href="https://course-dashboard-jglh.onrender.com/display.html"
            target="_blank" // Open in a new tab
            variant="gradient"
            gradient={{ from: "orange", to: "red", deg: 60 }}
            size="md"
            radius="xl"
          >
            Update Student Records
          </Button>
        </Flex>
      </Flex>
  
      {/* Teaching Courses Cards */}
      <Cards courses={courses} />
    </>
  );

  
    
};

export default ProfessorDashboard;
