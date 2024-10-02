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
  const [role, setRole] = useState('');

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

<<<<<<< Updated upstream
  const handleLogin = (values) => {
    navigate(`/user`);
  };
  const handleRegister = (values) => {
    navigate(`/Registerp`);
  };
=======
  const handleLogin = () => {
    
    if (role === 'admin') {
      navigate('/user');       // Redirect to admin page
    } else if (role === 'professor') {
      navigate('/professor');  // Redirect to professor page
    } else if (role === 'student') {
      navigate('/student');    // Redirect to student page
    }
  };
  
  const handleregister = (values) => {
    navigate(`/register`);
  };
  // const handleLogin = (values) => {
  //   navigate(`/user`);
  // };
>>>>>>> Stashed changes

  return (
    <>
      <Stack
        h={"100vh"}
        px={600}
        justify={"center"}
        align={"stretch"}
        gap={24}
        p={"10vh 5%"}
      >
<<<<<<< Updated upstream
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

=======
        <Select
        label="Select Role"
        placeholder="Pick Role"
        size="lg"
        data={[
          { value: 'admin', label: 'Admin' },
          { value: 'professor', label: 'Professor' },
          { value: 'student', label: 'Student' },
        ]}
        value={role}
        onChange={(selectedRole) => setRole(selectedRole)}  // Update role state
      />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
       
=======
        
>>>>>>> Stashed changes
        <Flex justify={"space-between"} gap={32}>
          <Button
            variant="outline"
            size="lg"
            onClick={handleRegister}
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
      
    </>
  );
}

export default Login;
