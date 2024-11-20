import React, { useEffect, useState } from "react";
import { Flex, Box, ScrollArea, Title, Button, Modal } from "@mantine/core";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/students/courses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCourses(await res.json());
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Click Here to View Your Attendance :</h1>
      {!showIframe ? (
        <Button
          onClick={() => setShowIframe(true)}
          variant="gradient"
          gradient={{ from: "orange", to: "red", deg: 60 }}
          size="md"
          radius="xl"
        >
          Update Student Records
        </Button>
      ) : (
        <Box mt="md" style={{ height: "600px", border: "1px solid #ddd" }}>
          <iframe
            src="https://student-individual-dashboard.onrender.com/"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Student Dashboard"
          />
        </Box>
      )}
    </div>
  );
};

export default StudentDashboard;
