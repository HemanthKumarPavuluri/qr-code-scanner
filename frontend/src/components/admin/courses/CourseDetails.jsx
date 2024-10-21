import { Title, Text, List, Stack, Button } from "@mantine/core";

const CourseDetails = ({
  data = {},
  openAsignProfessorModal,
  setOpenAsignProfessorModal,
  professors = [],
}) => {
  const getProfessorName = () => {
    const prof = professors.filter((p) => p._id === data.professor);
    return prof[0] ? prof[0].first_name + " " + prof[0].last_name : "";
  };

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

      <Title order={3}>Professor Asigned</Title>
      {data.professor && (
        <List spacing="sm">
          <List.Item>{getProfessorName()}</List.Item>
        </List>
      )}
      <Button
        variant="outline"
        onClick={() => setOpenAsignProfessorModal(!openAsignProfessorModal)}
      >
        Assign Professor
      </Button>

      <Title order={3}>Sections</Title>
      <List spacing="sm">
        {data.sections.map((section, index) => (
          <List.Item key={index}>
            <Text>
              <strong>Section Number:</strong> {section.section_number}
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
