import { Title, Text, List, Stack } from "@mantine/core";

const CourseDetails = ({ data = {} }) => {
  return (
    <Stack spacing="md">
      <Title order={1}>{data.course_name}</Title>
      <Text>
        <strong>Description:</strong> {data.description}
      </Text>
      <Text>
        <strong>CRN:</strong> {data.crn}
      </Text>

      <Title order={3}>Degree Levels Available</Title>
      <List spacing="sm">
        {data.degree_levels_available.map((level, index) => (
          <List.Item key={index}>{level}</List.Item>
        ))}
      </List>

      <Title order={3}>Sections</Title>
      <List spacing="sm">
        {data.sections.map((section, index) => (
          <List.Item key={index}>
            <Text>
              <strong>Section Number:</strong> {section.section_number}
            </Text>
            <Text>
              <strong>Professor Assigned:</strong> {section.professor_assigned}
            </Text>
            <Text>
              <strong>Level:</strong> {section.level}
            </Text>
          </List.Item>
        ))}
      </List>
    </Stack>
  );
};

export default CourseDetails;
