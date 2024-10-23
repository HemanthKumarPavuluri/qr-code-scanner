import QRCode from "react-qr-code";
import { Modal, Title } from "@mantine/core";

const CourseQRCode = ({ open, setOpen, course }) => {
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Scan the QR code to enroll the course"
      size={"xl"}
      closeOnClickOutside={false}
    >
      <Title order={4}>{course.name || ""}</Title>
      <QRCode value={`Successfully enrolled to the course! ${course.name}`} />
    </Modal>
  );
};

export default CourseQRCode;
