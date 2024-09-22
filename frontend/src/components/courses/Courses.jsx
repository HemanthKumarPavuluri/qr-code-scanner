import Cards from "./Cards";
import CardDetails from "./CardDetails";
import { Flex } from "@mantine/core";

const Courses = () => {
  return (
    <Flex>
      <Cards />
      <CardDetails />
    </Flex>
  );
};

export default Courses;
