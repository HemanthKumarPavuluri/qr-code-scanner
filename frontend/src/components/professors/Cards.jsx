import { Flex, Card, Image, Text, Button } from "@mantine/core";
import professorImage from "../../assets/prof_aziz_fellah.png";

const Cards = ({ professors = [], handleProfessorClick }) => {
  return (
    <Flex gap="lg" direction="row" align="center" justify="center" mt="xl">
      {professors.map((p) => (
        <Card
          key={p.professor_id}
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{ width: "300px" }}
          onClick={() => handleProfessorClick(p)}
        >
          <Card.Section>
            <Image src={professorImage} height={160} alt="Professor" />
          </Card.Section>
          <Text weight={500} size="lg" mt="md">
            {p.first_name + " " + p.last_name}
          </Text>
          <Text size="sm" mt="xs">
            {p.email}
          </Text>
          <Button fullWidth mt="md" radius="md">
            More Details
          </Button>
        </Card>
      ))}
    </Flex>
  );
};

export default Cards;
