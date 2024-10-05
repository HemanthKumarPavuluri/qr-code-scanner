import axios from "axios";

const addCourse = async (newCourse) => {
  const res = await axios({
    url: `http://localhost:3001/courses`,
    method: "POST",
    data: newCourse,
  });

  return res.data;
};

export default addCourse;
