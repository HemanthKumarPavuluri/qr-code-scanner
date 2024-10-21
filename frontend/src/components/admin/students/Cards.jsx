import { Flex, Card, Text, ActionIcon, Box } from "@mantine/core";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";

const Cards = ({
  students = [], // Array of student objects
  handleStudentClick,
  selectedStudent,
  handleDelete,
  openEditForm, // New prop to open the form with pre-filled details
}) => {
  return (
    <Flex gap="lg" wrap="wrap" justify="flex-start" mt="xl">
      {students.map((student) => (
        <Card
          key={student._id.$oid}
          shadow="lg"
          p="lg"
          radius="md"
          withBorder
          style={{ width: "300px", cursor: "pointer" }}
          onClick={() => handleStudentClick(student)}
        >
          <Text weight={500} size="lg" mt="md">
            {student.first_name} {student.last_name}
          </Text>
          <Text size="sm" mt="xs">
            Student ID: {student.student_id}
          </Text>

          {/* Display the courses enrolled */}
          <Text weight={500} size="sm" mt="md">
            Courses Enrolled:
          </Text>
          {student.courses_enrolled.map((course, index) => (
            <Box key={index} mt="xs">
              <Text size="sm">Course ID: {course.course_id}</Text>
              <Text size="sm">Section: {course.section_number}</Text>
              <Text size="sm">Professor: {course.professor_assigned}</Text>
              <Text size="sm">Level: {course.level}</Text>
            </Box>
          ))}

          {selectedStudent?._id.$oid === student._id.$oid && (
            <Flex justify={"flex-end"} pt={16} gap={20}>
              {/* Edit Button */}
              <ActionIcon
                variant="subtle"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card click event
                  openEditForm(student); // Open the form with student data
                }}
              >
                <IconPencil />
              </ActionIcon>

              {/* Delete Button */}
              <ActionIcon
                variant="subtle"
                color={"red"}
                onClick={(e) => handleDelete(e, student._id.$oid)}
              >
                <IconTrashXFilled />
              </ActionIcon>
            </Flex>
          )}

          {selectedStudent?._id.$oid !== student._id.$oid && (
            <Box h={45}></Box> // Placeholder for spacing
          )}
        </Card>
      ))}
    </Flex>
  );
};

export default Cards;
