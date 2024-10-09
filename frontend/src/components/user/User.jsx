import { AppShell, Burger, Flex, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Routes from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import "./user.css";
import { useStore } from "../../store/useStore";
import { ROLES } from "../../shared/constants";

const User = () => {
  const [closed, setOpened] = useState(false);
  const navigate = useNavigate();
  const { setRoute, role } = useStore();

  useEffect(() => {
    if (role === ROLES.ADMIN) navigate(`/admin/professors`);
    setRoute(`/admin/professors`);
  }, [role]);

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
      <AppShell.Header className="header">
        <Flex>
          <Flex px="md" w={300} h={60} gap={16} align={"center"}>
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
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" w={300}>
        <Routes />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default User;
