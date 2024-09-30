import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Title, Button, Modal } from "@mantine/core";
import Cards from "./Cards";
import CardDetails from "./ProfessorDetails";
import ProfessorForm from "./ProfessorForm"; // Import the form
import { fetchProfessors, deleteProfessor } from "../../api/index";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false); // State for modal open/close
  const [formProfessor, setFormProfessor] = useState(null); // State for prefilled professor

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

  const handleProfessorClick = (professor) => {
    setSelectedProfessor(professor);
  };

  // Function to open the form with prefilled details for editing
  const openEditForm = (professor) => {
    setFormOpen(true);
    setFormProfessor(professor); // Prefill form with selected professor data
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
        <ScrollArea h={"800"} w="40%" type="never">
          {selectedProfessor ? (
            <CardDetails data={selectedProfessor} />
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
          professor={formProfessor}
          setProfessors={setProfessors}
          setFormOpen={setFormOpen}
        />
      </Modal>
    </Box>
  );
};

export default Professors;
