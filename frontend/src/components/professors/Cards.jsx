import { Flex, Card, Text, ActionIcon } from "@mantine/core";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";

const Cards = ({
  professors = [], // Array of professor objects
  handleProfessorClick,
  selectedProfessor,
  handleDelete,
  openEditForm,
}) => {
  return (
    <Flex gap="lg" wrap="wrap" justify="flex-start" mt="xl">
      {professors.map((professor) => (
        <Card
          key={professor._id.$oid}
          shadow="lg"
          p="lg"
          radius="md"
          withBorder
          style={{ width: "300px", cursor: "pointer" }}
          onClick={() => handleProfessorClick(professor)}
        >
          <Text weight={500} size="lg" mt="md">
            {professor.first_name} {professor.last_name}
          </Text>
          <Text size="sm" mt="xs">
            Professor ID: {professor.professor_id}
          </Text>

          {/* Additional information if necessary */}

          {selectedProfessor?._id.$oid === professor._id.$oid && (
            <Flex justify={"flex-end"} pt={16} gap={20}>
              {/* Edit Button */}
              <ActionIcon
                variant="subtle"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditForm(professor);
                }}
              >
                <IconPencil />
              </ActionIcon>

              {/* Delete Button */}
              <ActionIcon
                variant="subtle"
                color={"red"}
                onClick={(e) => handleDelete(e, professor._id.$oid)}
              >
                <IconTrashXFilled />
              </ActionIcon>
            </Flex>
          )}
        </Card>
      ))}
    </Flex>
  );
};

export default Cards;
