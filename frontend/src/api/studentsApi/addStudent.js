import axios from "axios";

const addStudent = async (newStudent) => {
  const res = await axios({
    url: `http://localhost:3001/students`,
    method: "POST",
    data: newStudent,
  });

  return res.data;
};

export default addStudent;
