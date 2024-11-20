import React from "react";
import { Card, Text, Button, Flex } from "@mantine/core";

const Cards = ({
  students = [], // Default to an empty array
  courses = [], // Add courses array to map course IDs to titles
  handleStudentClick,
  handleDelete,
  openEditForm,
  openAssignCourses,
}) => {
  // Helper function to get course title by ID
  const getCourseTitle = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    return course ? course.course_name : "Untitled Course";
  };

  return (
    <Flex gap="lg" wrap="wrap" justify="flex-start" mt="xl">
      {students.length > 0 ? (
        students.map((student) => (
          <Card
            key={student._id}
            shadow="lg"
            p="lg"
            radius="md"
            withBorder
            style={{ width: "300px", cursor: "pointer" }}
            onClick={() => handleStudentClick(student)}
          >
            {/* Student Info */}
            <Text weight={500} size="lg" mt="md">
              {student.first_name + " "+student.last_name || "Unnamed Student"}
            </Text>
            <Text size="sm" mt="xs">
              Student ID: {student.student_id || "N/A"}
            </Text>

            {/* Assigned Courses */}
            <Text weight={500} size="sm" mt="md">
              Courses Assigned:
            </Text>
            {student.courses?.length > 0 ? (
              student.courses.map((courseId) => (
                <Text size="sm" key={courseId} mt="xs">
                  - {getCourseTitle(courseId)}
                </Text>
              ))
            ) : (
              <Text size="sm" color="dimmed" mt="xs">
                No courses assigned.
              </Text>
            )}

            {/* Action Buttons */}
            <Flex justify="space-between" mt="md">
              <Button
                size="xs"
                variant="outline"
                color="blue"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditForm(student);
                }}
              >
                Edit
              </Button>
              <Button
                size="xs"
                variant="light"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(e, student._id);
                }}
              >
                Delete
              </Button>
              <Button
                size="xs"
                variant="light"
                color="green"
                onClick={(e) => {
                  e.stopPropagation();
                  openAssignCourses(student);
                }}
              >
                Assign Courses
              </Button>
            </Flex>
          </Card>
        ))
      ) : (
        <Text size="lg" color="dimmed">
          No students to display.
        </Text>
      )}
    </Flex>
  );
};

export default Cards;
