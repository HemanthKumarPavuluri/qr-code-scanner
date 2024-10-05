import axios from "axios";

const fetchCourses = async () => {
  const res = await axios({
    url: `http://localhost:3001/courses`,
    method: "GET",
  });

  return res.data;
};

export default fetchCourses;
