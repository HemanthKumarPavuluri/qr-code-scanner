import {
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Stack,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { IconUser } from "@tabler/icons-react";
import "./login.css";
import { ROLES } from "../../shared/constants";

function Login() {
  const navigate = useNavigate();

  const { setRole, role } = useStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userId: "",
      password: "",
      role,
    },

    validate: {
      username: (value) => (value ? null : "Please enter user ID"),
      password: (value) => (value ? null : "Please enter password"),
      role: (value) => (value ? null : "Please select a Role"),
    },
  });

  const handleLogin = (values) => {
    navigate(`/${values.role}`);
    setRole(values.role);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <Stack
          h={"100vh"}
          className="login-page"
          justify={"center"}
          align={"stretch"}
          gap={24}
          p={"10v 5%"}
        >
          <TextInput
            placeholder="Username"
            label="Username"
            withAsterisk={true}
            size="lg"
            rightSection={<IconUser />}
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            size="lg"
            withAsterisk={true}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Flex justify={"space-between"} gap={32}>
            <Select
              withAsterisk={true}
              placeholder="Select Role"
              data={Object.values(ROLES)}
              comboboxProps={{ shadow: "md" }}
              size="lg"
              {...form.getInputProps("role")}
              key={form.key("role")}
            />
            <Button
              variant="filled"
              color="green"
              size="lg"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </Flex>
        </Stack>
      </form>
    </>
  );
}

export default Login;
