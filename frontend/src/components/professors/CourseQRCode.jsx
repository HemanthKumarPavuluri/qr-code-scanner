import { Modal, Title, Select, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import qrImage from "./image.png"; // Adjust the path as needed

const CourseQRCode = ({ open, setOpen, course = {} }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [qrVisible, setQrVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (selectedTime) {
      setTimeLeft(selectedTime * 60);
      setQrVisible(true);
    }
  }, [selectedTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setQrVisible(false);
    }
  }, [timeLeft]);

  const handleTimeChange = (value) => {
    setSelectedTime(Number(value));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Scan the QR code to Record Attendance"
      size={"xl"}
      closeOnClickOutside={false}
      styles={{
        modal: { padding: "30px", backgroundColor: "#f7f9fc", borderRadius: "10px" },
        header: { fontWeight: "bold", color: "#333" },
      }}
    >
      <Title order={4}>{course.name || "Course Name Unavailable"}</Title>

      <Select
        label="Select time to display QR code"
        placeholder="Pick one"
        data={[
          { value: "1", label: "1 minute" },
          { value: "5", label: "5 minutes" },
          { value: "10", label: "10 minutes" },
          { value: "15", label: "15 minutes" },
        ]}
        onChange={handleTimeChange}
        styles={{
          root: { marginBottom: "20px" },
          label: { fontWeight: "bold", color: "#1f2937" },
          input: { borderColor: "#d1d5db" },
        }}
      />

      {qrVisible && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={qrImage}
              alt="QR Code"
              style={{
                marginTop: "20px",
                width: "200px",
                height: "200px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            />
          </div>
          <Text
            size="lg"
            style={{
              marginTop: "15px",
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Time left: {formatTime(timeLeft)}
          </Text>
        </>
      )}
    </Modal>
  );
};

export default CourseQRCode;
