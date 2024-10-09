import React from "react";
import { Card, Text, Badge, Group } from "@mantine/core";

const StudentDetails = ({ student }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>
          {student.first_name} {student.last_name}
        </Text>
        <Badge color="proven" variant="light">
          Student ID: {student.student_id}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" mt="md">
        <b>Courses Enrolled:</b>
      </Text>

      {student.courses_enrolled.map((course, index) => (
        <div key={index} style={{ marginTop: "0.5rem" }}>
          <Text weight={500}>Course ID: {course.course_id}</Text>
          <Text size="xs">Section Number: {course.section_number}</Text>
          <Text size="xs">Professor Assigned: {course.professor_assigned}</Text>
          <Text size="xs">Level: {course.level}</Text>
        </div>
      ))}
    </Card>
  );
};

export default StudentDetails;
