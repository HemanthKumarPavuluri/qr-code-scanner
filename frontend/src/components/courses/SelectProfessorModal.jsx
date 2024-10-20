import { Modal, Flex, Select, Button } from "@mantine/core";
import { useState } from "react";

const SelectProfessorModal = ({
  open,
  setOpen,
  handleUpdateCourse,
  course,
  professors,
}) => {
  const [value, setValue] = useState(course.professor);

  const getData = () => {
    return professors.map((item) => {
      return {
        value: item._id,
        label: item.first_name + " " + item.last_name,
      };
    });
  };

  const handleAsign = () => {
    const cour = { ...course };
    cour.professor = value;
    handleUpdateCourse(cour);
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
        data={getData()}
        onChange={setValue}
        searchable
      />
      <Flex justify="flex-end">
        <Button mt={32} onClick={handleAsign}>
          Save
        </Button>
      </Flex>
    </Modal>
  );
};

export default SelectProfessorModal;
