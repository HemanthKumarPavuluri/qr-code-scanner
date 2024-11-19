import { useState, useEffect } from "react";
import { fetchProfessors, deleteProfessor } from "../../api/professorApi"; // API functions for professors
import { fetchCourses } from "../../api/coursesApi"; // API functions for professors
import { useStore } from "../../store/useStore";

const StudentDashboard = () => {
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
      {/* <ProfessorDetails data={professor} />

      {/* Button to redirect to Students page */}
      {/* <Flex justify="flex-end" mt="md">
        <Button
          component="a"
          href="https://course-dashboard-jglh.onrender.com/display.html"
          target="_blank" // Open in a new tab
          variant="outline"
        >
          Students
        </Button>
      </Flex> */}

      {/* <Cards courses={courses} /> */}
    </>
  );
};

export default StudentDashboard;
