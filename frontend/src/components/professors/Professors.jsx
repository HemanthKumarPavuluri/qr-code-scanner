import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Title, Button, Modal } from "@mantine/core";
import Cards from "./Cards"; // A component similar to Students' Cards
import ProfessorDetails from "./ProfessorDetails"; // Component for displaying professor details
import ProfessorForm from "./ProfessorForm"; // Form for adding/editing professors
import { fetchProfessors, deleteProfessor } from "../../../api/professorsApi"; // API functions for professors

const Professors = () => {
  const [professors, setProfessors] = useState([]); // State for professors
  const [selectedProfessor, setSelectedProfessor] = useState(undefined); // State for selected professor
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false); // State for modal open/close
  const [formProfessor, setFormProfessor] = useState(null); // State for prefilled professor details

  // Fetch professors data when the component loads
  useEffect(() => {
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
  }, []);

  // Handle professor selection
  const handleProfessorClick = (professor) => {
    setSelectedProfessor(professor);
  };

  // Function to open the form with prefilled details for editing
  const openEditForm = (professor) => {
    setFormOpen(true);
    setFormProfessor(professor); // Prefill form with selected professor data
  };

  // Handle deleting a professor
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

  // Handle opening the form for adding a new professor
  const handleFormOpen = () => {
    setFormOpen(true);
    setFormProfessor(null); // Reset for adding a new professor
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
            professors={professors} // Passing professors data to Cards
            selectedProfessor={selectedProfessor}
            handleProfessorClick={handleProfessorClick} // Handle professor selection
            handleDelete={handleDelete} // Handle professor deletion
            openEditForm={openEditForm} // Open form for editing
          />
        </ScrollArea>

        {/* Details Section */}
        <ScrollArea h={"800"} w="40%" type="never">
          {selectedProfessor ? (
            <ProfessorDetails data={selectedProfessor} />
          ) : (
            <p>Select a professor to view details</p>
          )}
        </ScrollArea>
      </Flex>

      {/* Modal for adding/editing a professor */}
      <Modal
        opened={formOpen}
        onClose={() => setFormOpen(false)}
        title={formProfessor ? "Edit Professor" : "Add Professor"}
      >
        <ProfessorForm
          professor={formProfessor} // Pass the professor to the form for editing
          setProfessors={setProfessors} // Update professors list after form submission
          setFormOpen={setFormOpen} // Close form after submission
        />
      </Modal>
    </Box>
  );
};

export default Professors;
