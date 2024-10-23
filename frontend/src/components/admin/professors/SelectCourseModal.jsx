import { Modal, Flex, MultiSelect, Button } from "@mantine/core";
import { useEffect, useState } from "react";

const SelectCourseModal = ({
  open,
  setOpen,
  handleUpdateProfessor,
  handleUpdateCourse,
  professor,
  courses,
}) => {
  const [value, setValue] = useState(professor.courses);
  const [addedCourse, setAddedCourse] = useState("");
  const [removedCourse, setRemovedCourse] = useState("");

  useEffect(() => {
    setValue(professor.courses);
  }, [professor]);

  const handleSetCourse = (event) => {
    const rarr = value.filter((val) => !event.includes(val));
    const aarr = event.filter((val) => !value.includes(val));

    if (rarr.length) {
      setRemovedCourse(rarr[0]);
      setAddedCourse("");
    }
    if (aarr.length) {
      setAddedCourse(aarr[0]);
      setRemovedCourse("");
    }
    setValue(event);
  };

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

    const selectedCourse = addedCourse ? addedCourse : removedCourse;
    const course = courses.filter((c) => c._id === selectedCourse);
    if (removedCourse) {
      course[0].professor = "";
    } else if (addedCourse) {
      course[0].professor = prof._id;
    }
    handleUpdateCourse(course[0]);
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
        onChange={(event) => handleSetCourse(event)}
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
