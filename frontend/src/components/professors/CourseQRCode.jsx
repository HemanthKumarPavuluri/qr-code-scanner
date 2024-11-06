//import QRCode from "react-qr-code";
import { Modal, Title } from "@mantine/core";
// Assuming you have a QR image in your project, import it like this:
import qrImage from "./image.png"; // Adjust the path as needed

const CourseQRCode = ({ open, setOpen, course }) => {
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Scan the QR code for attendance"
      size={"xl"}
      closeOnClickOutside={false}
    >
      <Title order={4}>{course.name || ""}</Title>

      {/* You can either display the dynamically generated QR code */}
      {/* <QRCode value={`Successfully enrolled to the course! ${course.name}`} /> */}

      {/* OR display the local image */}
      <img
        src={qrImage}
        alt="QR Code"
        style={{ marginTop: "20px", width: "200px", height: "200px" }}
      />


    </Modal>
  );
};

export default CourseQRCode;
