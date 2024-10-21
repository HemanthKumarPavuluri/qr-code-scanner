import { Modal, Flex, MultiSelect, Button } from "@mantine/core";
import { useState } from "react";

const SelectCourseModal = ({
  open,
  setOpen,
  handleUpdateProfessor,
  professor,
  courses,
}) => {
  const [value, setValue] = useState(professor.courses);

  const getData = () => {
    return courses.map((item) => {
      return {
        value: item._id,
        label: item.course_name,
      };
    });
  };

  const handleAsign = () => {
    const prof = { ...professor };
    prof.courses = value;
    handleUpdateProfessor(prof);
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Asign Course"
      size={"xl"}
      closeOnClickOutside={false}
    >
      <MultiSelect
        label="Select courses"
        data={getData()}
        value={value}
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

export default SelectCourseModal;
