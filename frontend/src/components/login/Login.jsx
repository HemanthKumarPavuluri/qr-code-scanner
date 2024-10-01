import { TextInput, PasswordInput, Button, Flex, Stack, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { IconUser } from "@tabler/icons-react";
import "./login.css";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [openRgisterModal, setOpenRegisterModal] = useState(false);

  const { module, client } = useStore();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userId: "",
      password: "",
      module,
      client,
    },

    validate: {
      userId: (value) => (value ? null : "Please enter user ID"),
      password: (value) => (value ? null : "Please enter password"),
      module: (value) => (value ? null : "Please select a module"),
      client: (value) => (value ? null : "Please select a client"),
    },
  });

  const handleregister = (values) => {
    navigate(`/register`);
  };
  const handleLogin = (values) => {
    navigate(`/user`);
  };

  return (
    <>
      <Stack
        h={"100vh"}
        px={600}
        justify={"center"}
        align={"stretch"}
        gap={24}
        p={"10v 5%"}
      >
        <Select
          label="Select Role"
          placeholder="Pick Role"
          size="lg"
          data={[
            { value: 'admin', label: 'Admin' },
            { value: 'professor', label: 'Professor' },
            { value: 'student', label: 'Student' }
          ]}
          withAsterisk
          key={form.key("role")}
          {...form.getInputProps("role")}
        />
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
        {/* <NumberInput
            placeholder="#919"
            label="#919"
            size="lg"
            withAsterisk={true}
            key={form.key("nineOneNine")}
            {...form.getInputProps("nineOneNine")}
          />
          <Select
            size={"lg"}
            placeholder="Select Role"
            withAsterisk={true}
            label="Role"
            data={[
              { value: "admin", label: "Admin" },
              { value: "professor", label: "Professor" },
              { value: "student", label: "Student" },
            ]}
            key={form.key("module")}
            {...form.getInputProps("module")}
            grow
          /> */}
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
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
        </Flex>
      </Stack>
      {/* <Register
        open={openRgisterModal}
        setOpen={setOpenRegisterModal}
      ></Register> */}
    </>
  );
}

export default Login;
