const deleteCourse = async (courseId) => {
    if (!courseId) {
      throw new Error("Course ID is required to delete.");
    }
  
    const response = await fetch(`http://localhost:3001/courses/${courseId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete course");
    }
  
    return await response.json();
  };
  
  export default deleteCourse;
  