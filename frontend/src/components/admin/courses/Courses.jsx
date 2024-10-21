import { useState, useEffect } from "react";
import { Flex, Box, ScrollArea, Title, Button, Modal } from "@mantine/core";
import Cards from "./Cards"; // Assuming Cards component can handle course cards as well
import CourseDetails from "./CourseDetails"; // Changed to CourseDetails
import CourseForm from "./CourseForm"; // Import the form for adding/editing courses
import { fetchCourses, deleteCourse } from "../../../api/coursesApi/index"; // Assuming similar API functions for courses
import SelectProfessorModal from "./SelectProfessorModal";
import { updateCourse } from "../../../api/coursesApi";
import { fetchProfessors } from "../../../api/professorApi";
import { showNotification } from "@mantine/notifications";

const Courses = () => {
  const [courses, setCourses] = useState([]); // State for courses
  const [selectedCourse, setSelectedCourse] = useState(undefined); // State for selected course
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false); // State for modal open/close
  const [formCourse, setFormCourse] = useState(null); // State for prefilled course details
  const [openAsignProfessorModal, setOpenAsignProfessorModal] = useState(false);
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    getCourses();
    getProfessors();
  }, []);

  const getCourses = () => {
    fetchCourses()
      .then((res) => {
        setCourses(res);
        if (res.length > 0) {
          setSelectedCourse(res[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch courses. Please try again later.");
        setLoading(false);
      });
  };

  const getProfessors = () => {
    fetchProfessors()
      .then((res) => {
        setProfessors(res);
      })
      .catch((err) => {
        setError("Failed to fetch professors. Please try again later.");
        setLoading(false);
      });
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  // Function to open the form with prefilled details for editing
  const openEditForm = (course) => {
    setFormOpen(true);
    setFormCourse(course); // Prefill form with selected course data
  };

  const handleUpdateCourse = async (updatedCourse) => {
    try {
      await updateCourse(updatedCourse);
      fetchCourses().then((res) => {
        setCourses(res);
        setOpenAsignProfessorModal(false);
        setFormOpen(false);
        setSelectedCourse({ ...updatedCourse });
      });
    } catch (error) {
      console.error("Error updating course:", error);
      showNotification({
        title: "Error updating course",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteCourse(id);
    console.log("Successfully deleted the course");
    fetchCourses().then((res) => {
      setCourses(res);
      if (res.length > 0) {
        setSelectedCourse(res[0]);
      }
    });
  };

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormCourse(null); // Reset for adding a new course
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box>
      <Flex justify={"space-between"}>
        <Box>
          <Title order={2}>Courses</Title>
          <Title order={5}>Select a course to view details</Title>
        </Box>
        <Button size="lg" m={16} onClick={() => handleFormOpen()}>
          Add Course
        </Button>
      </Flex>
      <Flex justify="center" gap={80} py={32}>
        {/* Cards Section */}
        <ScrollArea h={"800"} w="40%" type="never">
          <Cards
            courses={courses} // Assuming Cards can handle courses
            selectedCourse={selectedCourse}
            handleCourseClick={handleCourseClick} // Renamed for generic use
            handleDelete={handleDelete}
            openEditForm={openEditForm} // Pass openEditForm to Cards
          />
        </ScrollArea>

        {/* Details Section */}
        <ScrollArea h={"800"} w="40%" type="never">
          {selectedCourse ? (
            <CourseDetails
              data={selectedCourse}
              professors={professors}
              openAsignProfessorModal={openAsignProfessorModal}
              setOpenAsignProfessorModal={setOpenAsignProfessorModal}
            />
          ) : (
            <p>Select a course to view details</p>
          )}
        </ScrollArea>
      </Flex>

      {/* Modal for adding/editing a course */}
      <Modal
        opened={formOpen}
        onClose={() => setFormOpen(false)}
        size={"xl"}
        title={formCourse ? "Edit Course" : "Add Course"}
      >
        <CourseForm
          course={formCourse} // Pass the course to the form for editing
          setCourses={setCourses} // Update courses list after form submission
          setFormOpen={setFormOpen} // Close form after submission
          handleUpdateCourse={handleUpdateCourse}
        />
      </Modal>

      <SelectProfessorModal
        open={openAsignProfessorModal}
        setOpen={setOpenAsignProfessorModal}
        handleUpdateCourse={handleUpdateCourse}
        course={selectedCourse}
        professors={professors}
      />
    </Box>
  );
};

export default Courses;
