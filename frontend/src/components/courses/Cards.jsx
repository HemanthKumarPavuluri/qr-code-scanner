import { Flex, Card, Image, Text, ActionIcon, Box } from "@mantine/core";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";

// Importing the images
import profAzizImage from "../../assets/prof_aziz_fellah.png";
import profAjayImage from "../../assets/prof_ajay_bandi.png";
import profCindyImage from "../../assets/prof_cindytu.png";
import profRatanImage from "../../assets/prof_ratan_lal.png";

// Mapping professor names/IDs to their respective images
const imageMapping = {
  "Aziz Fellah": profAzizImage,
  "Ajay Bandi": profAjayImage,
  "Cindy Zhiling Tu": profCindyImage,
  "Ratan Lal": profRatanImage,
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
      {courses.map((p) => (
        <Card
          key={p.professor_id}
          shadow="lg"
          p="lg"
          radius="md"
          withBorder
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => handleCourseClick(p)}
        >
          <Card.Section>
            {/* Fetch the image based on professor name or ID */}
            <Image
              src={
                imageMapping[`${p.first_name} ${p.last_name}`] || profAzizImage
              } // Default to Aziz Fellah's image if no match
              height={160}
              alt={`${p.first_name} ${p.last_name}`}
              radius={"md"}
            />
          </Card.Section>
          <Text weight={500} size="lg" mt="md">
            {p.first_name + " " + p.last_name}
          </Text>
          <Text size="sm" mt="xs">
            {p.email}
          </Text>

          {selectedCourse?._id === p._id && (
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
              <ActionIcon
                variant="subtle"
                color={"red"}
                onClick={(e) => handleDelete(e, p._id)}
              >
                <IconTrashXFilled />
              </ActionIcon>
            </Flex>
          )}

          {selectedCourse?._id !== p._id && (
            <Box h={45}></Box> // Placeholder for spacing
          )}
        </Card>
      ))}
    </Flex>
  );
};

export default Cards;
