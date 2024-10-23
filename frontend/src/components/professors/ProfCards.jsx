import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Group } from '@mantine/core';
import axios from 'axios';

const ProfessorCards = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses assigned to the professor
  useEffect(() => {
    // Replace with your backend API endpoint
    const professorId = '123'; // Example professor ID, you may want to fetch this dynamically from login session
    axios.get(`/api/professor/${professorId}/courses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {courses.length > 0 ? (
        courses.map((course) => (
          <Card key={course.courseId} shadow="sm" padding="lg" style={{ width: '300px' }}>
            <Group position="apart">
              <Text weight={500} size="lg">{course.courseName}</Text>
            </Group>
            <Text size="sm" color="dimmed">Course ID: {course.courseId}</Text>
            <Text size="sm" color="dimmed">Section: {course.sectionNumber}</Text>
            <Text size="sm" color="dimmed">Level: {course.level}</Text>
            <Text size="sm" color="dimmed">Enrolled Students: {course.studentCount}</Text>
            <Button
              fullWidth
              mt="md"
              variant="outline"
              onClick={() => {
                // Add logic to view more course details or students list
                console.log('View details for course:', course.courseId);
              }}
            >
              View Course Details
            </Button>
          </Card>
        ))
      ) : (
        <Text>No courses assigned.</Text>
      )}
    </div>
  );
};

export default ProfessorCards;
