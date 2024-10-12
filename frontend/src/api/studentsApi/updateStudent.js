const updateStudent = async (studentData) => {
    if (!studentData._id) {
      throw new Error("Student ID is required to update.");
    }
  
    const response = await fetch(
      `http://localhost:3001/students/${studentData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to update student");
    }
  
    return await response.json();
  };
  
  export default updateStudent;
  