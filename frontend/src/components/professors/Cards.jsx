import {
  Flex,
  Card,
  Image,
  Text,
  Button,
  ActionIcon,
  Box,
} from "@mantine/core";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";
import professorImage from "../../assets/prof_aziz_fellah.png";

const Cards = ({
  professors = [],
  handleProfessorClick,
  selectedProfessor,
  openEditForm, // New prop to open the form with pre-filled details
}) => {
  return (
    <Flex gap="lg" wrap="wrap" justify="flex-start" mt="xl">
      {professors.map((p) => (
        <Card
          key={p.professor_id}
          shadow="lg"
          p="lg"
          radius="md"
          withBorder
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => handleProfessorClick(p)}
        >
          <Card.Section>
            <Image
              src={professorImage}
              height={160}
              alt="Professor"
              radius={"md"}
            />
          </Card.Section>
          <Text weight={500} size="lg" mt="md">
            {p.first_name + " " + p.last_name}
          </Text>
          <Text size="sm" mt="xs">
            {p.email}
          </Text>

          {selectedProfessor?.professor_id === p.professor_id && (
            <Flex justify={"flex-end"} pt={16} gap={20}>
              {/* Edit Button */}
              <ActionIcon
                variant="subtle"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card click event
                  openEditForm(p); // Open the form with professor data
                }}
              >
                <IconPencil />
              </ActionIcon>

              {/* Delete Button */}
              <ActionIcon variant="subtle" color={"red"}>
                <IconTrashXFilled />
              </ActionIcon>
            </Flex>
          )}

          {selectedProfessor?.professor_id !== p.professor_id && (
            <Box h={45}></Box> // Placeholder for spacing
          )}
        </Card>
      ))}
    </Flex>
  );
};

export default Cards;
