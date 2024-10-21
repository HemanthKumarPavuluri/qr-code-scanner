import { Title, Text, List, Stack, Button } from "@mantine/core";

const CardDetails = ({
  data = {},
  courses,
  openAsignCourseModal,
  setOpenAsignCourseModal,
}) => {
  const getCourses = () => {
    const cours = courses.filter((c) => data.courses?.includes(c._id));
    return cours.map((c) => c.course_name);
  };

  return (
    <>
      <Stack spacing="md">
        <Title order={1}>{`${data.first_name} ${data.last_name}`}</Title>
        <Title order={3}>{data.designation}</Title>
        <Text>
          <strong>Qualification:</strong> {data.qualification}
        </Text>

        <Text>
          <strong>Email:</strong> {data.email}
        </Text>
        <Text>
          <strong>Phone:</strong> {data.phone}
        </Text>
        <Text>
          <strong>Office:</strong> {data.office}
        </Text>

        <Title order={3}>Education</Title>
        <List spacing="sm">
          {data.education.map((edu, index) => (
            <List.Item key={index}>
              {edu.degree} in {edu.field}, {edu.institution} ({edu.year})
            </List.Item>
          ))}
        </List>

        <Title order={3}>Courses Taught</Title>
        <List spacing="sm">
          {getCourses().map((course, index) => (
            <List.Item key={index}>{course}</List.Item>
          ))}
        </List>
        <Button
          variant="outline"
          onClick={() => setOpenAsignCourseModal(!openAsignCourseModal)}
        >
          Assign/Remove Courses
        </Button>

        <Title order={3}>Academic Interests</Title>
        <List spacing="sm">
          {data.academic_interests.map((interest, index) => (
            <List.Item key={index}>{interest}</List.Item>
          ))}
        </List>
      </Stack>
    </>
  );
};

export default CardDetails;
