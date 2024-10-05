import axios from "axios";

const fetchProfessors = async () => {
  const res = await axios({
    url: `http://localhost:3001/professors`,
    method: "GET",
  });

  return res.data;
};

export default fetchProfessors;
