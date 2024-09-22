import { Title } from "@mantine/core";

const CardDetails = ({ data = {} }) => {
  return <Title>{data.first_name + " " + data.last_name}</Title>;
};

export default CardDetails;
