import { Flex, Card, Image, Text, Button } from "@mantine/core";
import professorImage from "../../assets/prof_aziz_fellah.png";

const Cards = () => {
  return (
    <Flex gap="lg" direction="row" align="center" justify="center" mt="xl">
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{ width: "300px" }}
      >
        <Card.Section>
          <Image src={professorImage} height={160} alt="Professor" />
        </Card.Section>
        <Text weight={500} size="lg" mt="md">
          Course 1
        </Text>
        <Text size="sm" mt="xs">
          Add, Edit and Remove Professor
        </Text>
        <Button fullWidth mt="md" radius="md">
          Edit
        </Button>
      </Card>

      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{ width: "300px" }}
      >
        <Card.Section>
          <Image
            src="https://manoa.hawaii.edu/wp/wp-content/uploads/2017/09/student-diversity-02.jpg"
            height={160}
            alt="Student"
          />
        </Card.Section>
        <Text weight={500} size="lg" mt="md">
          Student
        </Text>
        <Text size="sm" mt="xs">
          Add, Edit and Remove Student
        </Text>
        <Button fullWidth mt="md" radius="md">
          Manage Students
        </Button>
      </Card>
    </Flex>
  );
};

export default Cards;
