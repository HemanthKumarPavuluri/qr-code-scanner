import Cards from "./Cards";
import CardDetails from "./ProfessorDetails";
import { Flex, Stack } from "@mantine/core";
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
    <Flex
      justify="space-between"
      align="flex-start"
      gap="xl"
      wrap="wrap"
      mt="xl"
      px="xl"
    >
      {/* Cards Section */}
      <Stack spacing="xl" sx={{ flex: 1 }}>
        <Cards
          professors={professors}
          handleProfessorClick={handleProfessorClick}
        />
      </Stack>

      {/* Details Section */}
      <Stack spacing="xl" sx={{ flex: 2, minWidth: "300px" }}>
        {selectedProfessor ? (
          <CardDetails data={selectedProfessor} />
        ) : (
          <p>Select a professor to view details</p>
        )}
      </Stack>
    </Flex>
  );
};

export default Professors;
