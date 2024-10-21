import { Flex, Card, Image, Text, ActionIcon, Box } from "@mantine/core";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";

// Importing the images
import courseImage from "../../../assets/PatternsAndFrameWorks.jpg";

// Mapping professor names/IDs to their respective images
const imageMapping = {
  "Patterns and frameworks": courseImage,
};

const Cards = ({
  courses = [],
  handleCourseClick,
  selectedCourse,
  handleDelete,
  openEditForm, // New prop to open the form with pre-filled details
}) => {
  return (
    <Flex gap="lg" wrap="wrap" justify="flex-start" mt="xl">
      {courses.map((c) => (
        <Card
          key={c._id}
          shadow="lg"
          p="lg"
          radius="md"
          withBorder
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => handleCourseClick(c)}
        >
          <Card.Section>
            {/* Fetch the image based on professor name or ID */}
            <Image
              src={imageMapping[`${c.course_name}`] || courseImage}
              height={160}
              alt={c.course_name}
              radius={"md"}
            />
          </Card.Section>
          <Text weight={500} size="lg" mt="md">
            {c.course_name}
          </Text>
          <Text size="sm" mt="xs">
            {c.crn}
          </Text>

          {selectedCourse?._id === c._id && (
            <Flex justify={"flex-end"} pt={16} gap={20}>
              {/* Edit Button */}
              <ActionIcon
                variant="subtle"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card click event
                  openEditForm(c); // Open the form with professor data
                }}
              >
                <IconPencil />
              </ActionIcon>

              {/* Delete Button */}
              <ActionIcon
                variant="subtle"
                color={"red"}
                onClick={(e) => handleDelete(e, c._id)}
              >
                <IconTrashXFilled />
              </ActionIcon>
            </Flex>
          )}

          {selectedCourse?._id !== c._id && (
            <Box h={45}></Box> // Placeholder for spacing
          )}
        </Card>
      ))}
    </Flex>
  );
};

export default Cards;
