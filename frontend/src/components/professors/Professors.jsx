import Cards from "./Cards";
import CardDetails from "./ProfessorDetails";
import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchProfessors } from "../../api/index";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(undefined);

  useEffect(() => {
    fetchProfessors().then((res) => {
      setProfessors(res);
      setSelectedProfessor(res[0]);
    });
  }, []);

  const handleProfessorClick = (professor) => {
    setSelectedProfessor(professor);
  };

  return (
    <Flex>
      <Cards
        professors={professors}
        handleProfessorClick={handleProfessorClick}
      />
      {selectedProfessor && <CardDetails data={selectedProfessor} />}
    </Flex>
  );
};

export default Professors;
