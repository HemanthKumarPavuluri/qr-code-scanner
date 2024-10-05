const deleteProfessor = async (professorId) => {
  if (!professorId) {
    throw new Error("Professor ID is required to update.");
  }

  const response = await fetch(
    `http://localhost:3001/professors/${professorId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete professor");
  }

  return await response.json();
};

export default deleteProfessor; // Make sure to export as default
