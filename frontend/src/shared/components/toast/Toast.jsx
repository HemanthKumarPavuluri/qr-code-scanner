import React, { useEffect } from "react";
import { Notification } from "@mantine/core";
import { useToast } from "./useToast";

const Toast = ({ message, type, loading = false }) => {
  const toast = useToast();

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        toast.hide();
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loading]);

  const getColor = () => {
    switch (type) {
      case "success":
        return "green";
      case "info":
        return "";
      case "error":
        return "red";
      default:
        return "";
    }
  };

  return (
    <Notification
      color={getColor()}
      loading={loading}
      withBorder
      w={"20rem"}
      withCloseButton={false}
      title={message}
      style={{ zIndex: 1000 }}
    ></Notification>
  );
};

export default Toast;
