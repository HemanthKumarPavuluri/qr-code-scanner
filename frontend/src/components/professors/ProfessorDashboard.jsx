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
        const cours = res.filter((c) => prof.courses.includes(c._id));
        setCourses(cours);
      });
    });
  }, []);

  return (
    <>
      <ProfessorDetails data={professor} />
      <Cards courses={courses} />
    </>
  );
};

export default ProfessorDashboard;