const updateProfessor = async (professorData) => {
  if (!professorData.id) {
    throw new Error("Professor ID is required to update.");
  }

  const response = await fetch(`/api/professors/${professorData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(professorData),
  });

  if (!response.ok) {
    throw new Error("Failed to update professor");
  }

  return await response.json();
};

export default updateProfessor; // Make sure to export as default
