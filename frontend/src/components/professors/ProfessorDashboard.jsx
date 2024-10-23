import { useState, useEffect } from "react";
import { Flex, Box, Button } from "@mantine/core"; // Import Button here
import Cards from "./Cards";
import ProfessorDetails from "./ProfessorDetails";
import ProfessorForm from "./ProfessorForm";
import { fetchProfessors, deleteProfessor } from "../../api/professorApi";
import { fetchCourses } from "../../api/coursesApi";
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
  }, []);

  return (
    <Box>
      <ProfessorDetails data={professor} />
      
      {/* Add the "Students" button here */}
      <Flex justify="flex-end" mt="md">
        <Button
          onClick={() => window.open("https://course-dashboard-jglh.onrender.com/display.html", "_blank")}
        >
          Students
        </Button>
      </Flex>

      <Cards courses={courses} />
    </Box>
  );
};

export default ProfessorDashboard;
