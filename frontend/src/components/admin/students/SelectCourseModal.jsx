import { Modal, Flex, MultiSelect, Button } from "@mantine/core";
import { useEffect, useState } from "react";

const SelectCourseModal = ({
  open,
  setOpen,
  handleUpdateStudent,
  handleUpdateCourse,
  student = {}, // Default empty object for student
  courses = [], // Default empty array for courses
}) => {
  const [value, setValue] = useState(student?.courses || []);
  const [addedCourse, setAddedCourse] = useState("");
  const [removedCourse, setRemovedCourse] = useState("");

  // Update selected courses when the student changes
  useEffect(() => {
    setValue(student.courses || []);
  }, [student]);

  // Determine added or removed courses
  const handleSetCourse = (event) => {
    const removed = value.filter((val) => !event.includes(val));
    const added = event.filter((val) => !value.includes(val));

    if (removed.length) {
      setRemovedCourse(removed[0]);
      setAddedCourse("");
    }
    if (added.length) {
      setAddedCourse(added[0]);
      setRemovedCourse("");
    }
    setValue(event);
  };

  // Format courses data for the dropdown
  const getData = () => {
    return courses.map((item) => ({
      value: item._id,
      label: item.course_name,
    }));
  };

  // Handle course assignment or removal
  const handleAssign = () => {
    const updatedStudent = { ...student };
    updatedStudent.courses = value;
    handleUpdateStudent(updatedStudent); // Update the student's assigned courses

    const selectedCourse = addedCourse || removedCourse;
    const course = courses.find((c) => c._id === selectedCourse);

    if (removedCourse) {
      // Remove student from the course
      course.students = course.students.filter((s) => s !== student._id);
    } else if (addedCourse) {
      // Add student to the course
      course.students = [...(course.students || []), student._id];
    }

    handleUpdateCourse(course); // Update the course's assigned students
    setOpen(false); // Close the modal
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Assign Courses"
      size={"xl"}
      closeOnClickOutside={false}
    >
      <MultiSelect
        label="Select courses"
        data={getData()}
        value={value}
        onChange={handleSetCourse}
        searchable
      />
      <Flex justify="flex-end">
        <Button mt={32} onClick={handleAssign}>
          Save
        </Button>
      </Flex>
    </Modal>
  );
};

export default SelectCourseModal;
