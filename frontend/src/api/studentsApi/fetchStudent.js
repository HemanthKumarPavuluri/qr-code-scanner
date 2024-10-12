import axios from "axios";

const fetchStudent = async () => {
  const res = await axios({
    url: `http://localhost:3001/students`,
    method: "GET",
  });

  return res.data;
};

export default fetchStudent;