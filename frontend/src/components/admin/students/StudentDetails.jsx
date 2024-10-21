import { Title, Text, List, Stack } from "@mantine/core";

const StudentDetails = ({ data = {} }) => {
  return (
    <Stack spacing="md">
      {/* Display Student's Name */}
      <Title order={1}>
        {data.first_name} {data.last_name}
      </Title>

      {/* Student ID */}
      <Text>
        <strong>Student ID:</strong> {data.student_id}
      </Text>

      {/* Display List of Courses Enrolled */}
      <Title order={3}>Courses Enrolled</Title>
      <List spacing="sm">
        {data.courses_enrolled?.map((course, index) => (
          <List.Item key={index}>
            <Text>
              <strong>Course ID:</strong> {course.course_id}
            </Text>
            <Text>
              <strong>Section Number:</strong> {course.section_number}
            </Text>
            <Text>
              <strong>Professor Assigned:</strong> {course.professor_assigned}
            </Text>
            <Text>
              <strong>Level:</strong> {course.level}
            </Text>
          </List.Item>
        ))}
      </List>
    </Stack>
  );
};

export default StudentDetails;
