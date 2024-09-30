import { useState, useEffect } from "react";
import { TextInput, Button, Box, Title, Flex } from "@mantine/core";
import { addProfessor } from "../../api"; // Import the addProfessor function
import { updateProfessor } from "../../api";
import { showNotification } from "@mantine/notifications";

const ProfessorForm = ({ professor, onSave, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [office, setOffice] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [education, setEducation] = useState(""); // Comma-separated string
  const [coursesTaught, setCoursesTaught] = useState(""); // Comma-separated string
  const [academicInterests, setAcademicInterests] = useState(""); // Comma-separated string

  useEffect(() => {
    if (professor) {
      setFirstName(professor.first_name || "");
      setLastName(professor.last_name || "");
      setEmail(professor.email || "");
      setPhone(professor.phone || "");
      setOffice(professor.office || "");
      setQualification(professor.qualification || "");
      setDesignation(professor.designation || "");
      const professorId = professor.id || "";
      // Convert the array of education objects to a comma-separated string
      setEducation(
        professor.education
          ? professor.education
              .map(
                (item) =>
                  `${item.degree} in ${item.field} from ${item.institution} (${item.year.$numberInt})`
              )
              .join(", ")
          : ""
      );
      setCoursesTaught(
        professor.courses_taught ? professor.courses_taught.join(", ") : ""
      );
      setAcademicInterests(
        professor.academic_interests
          ? professor.academic_interests.join(", ")
          : ""
      );
    } else {
      // Reset form for new professor
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setOffice("");
      setQualification("");
      setDesignation("");
      setEducation("");
      setCoursesTaught("");
      setAcademicInterests("");
    }
  }, [professor]);

  const handleAddProfessor = async (newProfessor) => {
    try {
      const addedProfessor = await addProfessor(newProfessor);
      console.log("New Professor added:", addedProfessor);
      if (onSave && typeof onSave === "function") {
        onSave(addedProfessor);
      }
    } catch (error) {
      console.error("Error adding professor:", error);
      showNotification({
        title: "Error adding professor",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleUpdateProfessor = async (updatedProfessor) => {
    try {
      const updatedData = await updateProfessor(updatedProfessor);
      console.log("Professor updated:", updatedData);
      if (onSave && typeof onSave === "function") {
        onSave(updatedData);
      }
    } catch (error) {
      console.error("Error updating professor:", error);
      showNotification({
        title: "Error updating professor",
        message: error.message || "Something went wrong!",
        color: "red",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the professor data to be sent to the API
    const professorData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      office: office,
      qualification: qualification,
      designation: designation,

      education: education.split(",").map((item) => {
        const parts = item.split("from");
        const yearMatch = parts[1]?.trim().match(/\((.*?)\)/);
        const year = yearMatch ? yearMatch[1] : "";

        return {
          degree: parts[0]?.trim() || "",
          field: parts[1]?.trim().split("(")[0]?.trim() || "",
          institution:
            parts[1]?.trim().split("(")[1]?.replace(")", "").trim() || "",
          year: { $numberInt: year },
        };
      }),
      courses_taught: coursesTaught.split(",").map((item) => item.trim()),
      academic_interests: academicInterests
        .split(",")
        .map((item) => item.trim()),
    };

    console.log("Professor ID for update:", professor ? professor.id : "None");
    if (professor && professor.professor_id) {
      // Adjusted to check the right ID
      handleUpdateProfessor({ id: professor.professor_id, ...professorData });
    } else {
      handleAddProfessor(professorData);
    }
  };

  return (
    <Box>
      <Title order={3}>
        {professor ? "Edit Professor" : "Add New Professor"}
      </Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="md">
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextInput
            label="Office"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
          />
          <TextInput
            label="Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
          <TextInput
            label="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <TextInput
            label="Education (e.g., PhD in Computer Science from University of Example (2015), MSc in Information Technology from Tech University (2010))"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
          <TextInput
            label="Courses Taught (comma separated)"
            value={coursesTaught}
            onChange={(e) => setCoursesTaught(e.target.value)}
          />
          <TextInput
            label="Academic Interests (comma separated)"
            value={academicInterests}
            onChange={(e) => setAcademicInterests(e.target.value)}
          />

          <Flex gap="md" justify="space-between">
            <Button type="submit">
              {professor ? "Update Professor" : "Add Professor"}
            </Button>
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default ProfessorForm;
