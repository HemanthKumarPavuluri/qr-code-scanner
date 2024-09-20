import {
  AppShell,
  Burger,
  Flex,
  Text,
  Card,
  Image,
  Button,
} from "@mantine/core";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Routes from "../routes/Routes";
import "./user.css";

// Import local image
import professorImage from "./proff.jpg"; // Adjust path if necessary

const User = () => {
  const [closed, setOpened] = useState(false);

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
        {/* Two Card components side by side */}
        <Flex gap="lg" direction="row" align="center" justify="center" mt="xl">
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            style={{ width: "300px" }}
          >
            <Card.Section>
              <Image src={professorImage} height={160} alt="Professor" />
            </Card.Section>
            <Text weight={500} size="lg" mt="md">
              Professor
            </Text>
            <Text size="sm" mt="xs">
              Add, Edit and Remove Professor
            </Text>
            <Button fullWidth mt="md" radius="md">
              Manage Professors
            </Button>
          </Card>

          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            style={{ width: "300px" }}
          >
            <Card.Section>
              <Image
                src="https://manoa.hawaii.edu/wp/wp-content/uploads/2017/09/student-diversity-02.jpg"
                height={160}
                alt="Student"
              />
            </Card.Section>
            <Text weight={500} size="lg" mt="md">
              Student
            </Text>
            <Text size="sm" mt="xs">
              Add, Edit and Remove Student
            </Text>
            <Button fullWidth mt="md" radius="md">
              Manage Students
            </Button>
          </Card>
        </Flex>

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default User;
