import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Title, Button, Modal } from "@mantine/core";
import Cards from "./Cards";
import CardDetails from "./ProfessorDetails";
import ProfessorForm from "./ProfessorForm"; // Import the form
import { fetchProfessors, deleteProfessor } from "../../../api/professorApi";
import SelectCourseModal from "./SelectCourseModal";
import { updateProfessor } from "../../../api/professorApi";
import { fetchCourses, updateCourse } from "../../../api/coursesApi";
import { showNotification } from "@mantine/notifications";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false); // State for modal open/close
  const [formProfessor, setFormProfessor] = useState(null); // State for prefilled professor
  const [openAsignCourseModal, setOpenAsignCourseModal] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getProfessors();
    getCourses();
  }, []);

  const getProfessors = () => {
    fetchProfessors()
      .then((res) => {
        setProfessors(res);
        if (res.length > 0) {
          setSelectedProfessor(res[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch professors. Please try again later.");
        setLoading(false);
      });
  };

  const getCourses = () => {
    fetchCourses()
      .then((res) => {
        setCourses(res);
      })
      .catch((err) => {
        setError("Failed to fetch courses. Please try again later.");
        setLoading(false);
      });
  };

  const handleProfessorClick = (professor) => {
    setSelectedProfessor(professor);
  };

  // Function to open the form with prefilled details for editing
  const openEditForm = (professor) => {
    setFormOpen(true);
    setFormProfessor(professor); // Prefill form with selected professor data
  };

  const handleUpdateProfessor = async (updatedProfessor) => {
    try {
      await updateProfessor(updatedProfessor);
      fetchProfessors().then((res) => {
        setProfessors(res);
        setSelectedProfessor({ ...updatedProfessor });
        setFormOpen(false);
        setOpenAsignCourseModal(false);
        showNotification({
          title: "Update professor",
          message: "Professor updated successfully",
          color: "green",
        });
      });
    } catch (error) {
      console.error("Error updating professor:", error);
      showNotification({
        title: "Error updating professor",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleUpdateCourse = async (updatedCourse) => {
    await updateCourse(updatedCourse);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteProfessor(id);
    console.log("Successfully deleted the professor");
    fetchProfessors().then((res) => {
      setProfessors(res);
      if (res.length > 0) {
        setSelectedProfessor(res[0]);
      }
    });
  };

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormProfessor(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box>
      <Flex justify={"space-between"}>
        <Box>
          <Title order={2}>Professors</Title>
          <Title order={5}>Select a professor to view details</Title>
        </Box>
        <Button size="lg" m={16} onClick={() => handleFormOpen()}>
          Add Professor
        </Button>
      </Flex>
      <Flex justify="center" gap={80} py={32}>
        {/* Cards Section */}
        <ScrollArea h={"800"} w="40%" type="never">
          <Cards
            professors={professors}
            selectedProfessor={selectedProfessor}
            handleProfessorClick={handleProfessorClick}
            handleDelete={handleDelete}
            openEditForm={openEditForm} // Pass openEditForm to Cards
          />
        </ScrollArea>

        {/* Details Section */}
        <ScrollArea h={"800"} w={"40%"} type="never">
          {selectedProfessor ? (
            <CardDetails
              data={selectedProfessor}
              courses={courses}
              openAsignCourseModal={openAsignCourseModal}
              setOpenAsignCourseModal={setOpenAsignCourseModal}
            />
          ) : (
            <p>Select a professor to view details</p>
          )}
        </ScrollArea>
      </Flex>

      {/* Modal for adding/editing a professor */}
      <Modal
        opened={formOpen}
        onClose={() => setFormOpen(false)}
        size={"xl"}
        title={formProfessor ? "Edit Professor" : "Add Professor"}
      >
        <ProfessorForm
          professor={formProfessor}
          setProfessors={setProfessors}
          setSelectedProfessor={setSelectedProfessor}
          setFormOpen={setFormOpen}
          handleUpdateProfessor={handleUpdateProfessor}
        />
      </Modal>

      <SelectCourseModal
        open={openAsignCourseModal}
        setOpen={setOpenAsignCourseModal}
        handleUpdateProfessor={handleUpdateProfessor}
        handleUpdateCourse={handleUpdateCourse}
        professor={selectedProfessor}
        courses={courses}
      />
    </Box>
  );
};

export default Professors;
