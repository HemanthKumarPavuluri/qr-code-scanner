import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Title, Button } from "@mantine/core";
import Cards from "./Cards"; // A component similar to Students' Cards
import ProfessorDetails from "./ProfessorDetails"; // Component for displaying professor details
import { fetchProfessors, deleteProfessor } from "../../api/professorApi"; // API functions for professors
import { fetchCourses } from "../../api/coursesApi"; // API functions for professors
import { useStore } from "../../store/useStore";

const ProfessorDashboard = () => {
  const { professorID } = useStore();
  const [professor, setProfessor] = useState({});
  const [courses, setCourses] = useState([]);
  const [iframeSrc, setIframeSrc] = useState(null); // State for the iframe source

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

      {/* Section Title with Buttons */}
      <Flex justify="space-between" align="center" mt="xl" mb="md">
        <Title order={4}>All Teaching Courses</Title>
        <Flex gap="sm">
          <Button
            onClick={() => setIframeSrc("https://professor-student-records.onrender.com/")}
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            size="md"
            radius="xl"
          >
            View Students Records
          </Button>
          <Button
            onClick={() => setIframeSrc("https://course-dashboard-jglh.onrender.com/display.html")}
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

      {/* Embedded iframe */}
      {iframeSrc && (
        <Box mt="md" style={{ height: "600px", border: "1px solid #ddd" }}>
          <iframe
            src={iframeSrc}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Embedded Content"
          />
        </Box>
      )}
    </>
  );
};

export default ProfessorDashboard;
