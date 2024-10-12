const deleteStudent = async (studentId) => {
    if (!studentId) {
      throw new Error("Student ID is required to delete.");
    }
  
    const response = await fetch(`http://localhost:3001/students/${studentId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete student");
    }
  
    return await response.json();
  };
  
  export default deleteStudent;
  