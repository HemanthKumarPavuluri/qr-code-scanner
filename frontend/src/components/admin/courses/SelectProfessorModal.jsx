import { Modal, Flex, Select, Button } from "@mantine/core";
import { useState, useEffect } from "react";

//Here we fetch the professor
const SelectProfessorModal = ({
  open,
  setOpen,
  handleUpdateCourse,
  handleUpdateProfessor,
  course,
  professors,
}) => {
  const [value, setValue] = useState(course?.professor || {});
  const [addedProfessor, setAddedProfessor] = useState("");
  const [removedProfessor, setRemovedProfessor] = useState("");

  useEffect(() => {
    setValue(course.professor);
  }, [course]);

  const getData = () => {
    return professors.map((item) => {
      return {
        value: item._id,
        label: item.first_name + " " + item.last_name,
      };
    });
  };

  const handleSetValue = (event) => {
    setAddedProfessor(event);
    setRemovedProfessor("");
    setValue(event);
  };

  const handleUnAsign = () => {
    setValue(null);
  };

  const handleAsign = () => {
    const cour = { ...course };
    cour.professor = value;
    handleUpdateCourse(cour);

    const selectedProfessor = addedProfessor
      ? addedProfessor
      : removedProfessor;
    const professor = professors.filter((p) => p._id === selectedProfessor)[0];
    if (removedProfessor) {
      professor.courses = professor.courses.filter(
        (i) => i !== selectedProfessor
      );
    } else if (addedProfessor && !professor.courses.includes(addedProfessor)) {
      professor.courses = [...professor.courses, course._id];
    }
    handleUpdateProfessor(professor);
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Asign/Update Professor"
      size={"xl"}
      closeOnClickOutside={false}
    >
      <Select
        label="Professor"
        placeholder="Pick value"
        value={value}
        data={getData()}
        onChange={(e) => handleSetValue(e)}
        searchable
      />
      <Flex justify="flex-end" gap={20}>
        <Button mt={32} variant={"outline"} onClick={handleUnAsign}>
          Unasign
        </Button>
        <Button mt={32} onClick={handleAsign}>
          Save
        </Button>
      </Flex>
    </Modal>
  );
};

export default SelectProfessorModal;
