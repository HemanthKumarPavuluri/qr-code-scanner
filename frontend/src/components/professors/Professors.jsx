import Cards from "./Cards";
import CardDetails from "./ProfessorDetails";
import { Flex, Box, ScrollArea, Title, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchProfessors } from "../../api/index";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box>
      <Flex justify={"space-between"}>
        <Box>
          <Title order={2}>Professors</Title>
          <Title order={5}>Select a professor to view details</Title>
        </Box>
        <Button size="lg" m={16}>
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
    </Box>
  );
};

export default Professors;
