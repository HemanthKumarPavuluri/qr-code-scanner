import { AppShell, Burger, Button, Flex, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Routes from "../routes/Routes";
import { useStore } from "../../store/useStore";
import { ROLES } from "../../shared/constants";
import "./user.css";

const User = () => {
  const [closed, setOpened] = useState(false);
  const navigate = useNavigate();
  const { setRoute, role } = useStore();

  useEffect(() => {
    if (role === ROLES.ADMIN) {
      navigate(`/admin/professors`);
      setRoute(`/admin/professors`);
    }
    if (role === ROLES.PROFESSOR) {
      navigate(`/professor/dashboard`);
      setRoute(`/professor/dashboard`);
    }
  }, [role]);

  const handleLogout = () => {
    // Clear user session or tokens
    localStorage.removeItem("authToken"); // Example for clearing token
    navigate("/"); // Redirect to login page
  };

  return (
    <AppShell
      className="user"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: closed },
      }}
      padding="md"
      h={"100%"}
    >
      {/* Header with background color */}
      <AppShell.Header className="header" style={{ backgroundColor: "#001F3F" }}>
        <Flex justify="space-between" align="center" px="md" h={60}>
          <Flex gap={16} align={"center"}>
            <Burger
              opened={closed}
              onClick={() => setOpened(!closed)}
              aria-label="Toggle navigation"
              color="white"
            />
            <Text fw={500} size="20" c={"white"}>
              Northwest Missouri
            </Text>
          </Flex>
          <Button
            size="sm"
            style={{
              backgroundColor: "#e63946", // Button background color
              color: "white", // Button text color
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      </AppShell.Header>

      {/* Sidebar with background color */}
      <AppShell.Navbar
        p="md"
        w={300}
        style={{ backgroundColor: "#001F3F", color: "white" }} // Sidebar styling
      >
        <Routes />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default User;
