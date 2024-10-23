import { Title, Text, Stack } from "@mantine/core";

const ProfessorDetails = ({ data = {} }) => {
  return (
    <Stack spacing="md">
      <Title order={1}>
        {data.first_name} {data.last_name}
      </Title>
      <Text>
        <strong>Professor ID:</strong> {data._id}
      </Text>
      {/* Add additional professor details if needed */}
    </Stack>
  );
};

export default ProfessorDetails;
