import axios from "axios";

const addProfessor = async (newProfessor) => {
  const res = await axios({
    url: `http://localhost:3001/professors`,
    method: "POST",
    data: newProfessor,
  });

  return res.data;
};

export default addProfessor;
