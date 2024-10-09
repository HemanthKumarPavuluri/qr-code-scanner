import { TextInput, PasswordInput, Button, Flex, Stack, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const { module, client } = useStore();

  // Setting up the form
  const form = useForm({
    initialValues: {
      userId: "",
      password: "",
      role: "",  // Ensure role is part of initialValues
      module,
      client,
    },

    validate: {
      userId: (value) => (value ? null : "Please enter user ID"),
      password: (value) => (value ? null : "Please enter password"),
      role: (value) => (value ? null : "Please select a role"),  // Validate role is selected
      module: (value) => (value ? null : "Please select a module"),
      client: (value) => (value ? null : "Please select a client"),
    },
  });

  // Handle login logic
  const handleLogin = () => {
    const { role } = form.values;  // Retrieve the role from form values

    // Redirect based on role
    if (role === "admin") {
      navigate("/user");
    } else if (role === "professor") {
      navigate("/professors");
    } else if (role === "student") {
      navigate("/students");
    } else {
      alert("Please select a valid role");
    }
  };

  // Redirect to the register page
  const handleregister = () => {
    navigate(`/register`);
  };

  return (
    <Stack
      h={"100vh"}
      px={600}
      justify={"center"}
      align={"stretch"}
      gap={24}
      p={"10vh 5%"}
    >
      {/* Role Selection Dropdown */}
      <Select
        label="Select Role"
        placeholder="Pick Role"
        size="lg"
        data={[
          { value: "admin", label: "Admin" },
          { value: "professor", label: "Professor" },
          { value: "student", label: "Student" }
        ]}
        withAsterisk
        {...form.getInputProps("role")}  // Ensure role is tied to form state
      />

      {/* Username Input */}
      <TextInput
        placeholder="Username"
        label="Username"
        withAsterisk={true}
        size="lg"
        rightSection={<IconUser />}
        {...form.getInputProps("userId")}  // Form binding for username
      />

      {/* Password Input */}
      <PasswordInput
        placeholder="Password"
        label="Password"
        size="lg"
        withAsterisk={true}
        {...form.getInputProps("password")}  // Form binding for password
      />

      {/* Login and Register Buttons */}
      <Flex justify={"space-between"} gap={32}>
        <Button
          variant="outline"
          size="lg"
          onClick={handleregister}
          fullWidth
        >
          Register
        </Button>
        <Button
          variant="filled"
          color="green"
          size="lg"
          onClick={handleLogin}  // Trigger login logic on click
          fullWidth
        >
          Login
        </Button>
      </Flex>
    </Stack>
  );
}

export default Login;
