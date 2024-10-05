const updateCourse = async (courseData) => {
    if (!courseData._id) {
      throw new Error("Course ID is required to update.");
    }
  
    const response = await fetch(
      `http://localhost:3001/courses/${courseData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to update course");
    }
  
    return await response.json();
  };
  
  export default updateCourse;
  