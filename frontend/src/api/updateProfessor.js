import axios from "axios";

const updateProfessor = async (id, updatedData) => {
  const res = await axios({
    url: `http://localhost:3001/professors/${id}`,
    method: "PUT",
    data: updatedData,
  });

  return res.data;
};

export default updateProfessor;
