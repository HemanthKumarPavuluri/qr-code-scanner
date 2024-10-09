import React from "react";
import "@mantine/core/styles/global.css";
import "./App.css";
import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import { THEME, ROLES } from "./shared/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "./shared/components";
import AppContextProvider from "./store/AppContextProvider";
import User from "./components/user/User";
import Courses from "./components/courses/Courses";
import Professors from "./components/professors/Professors";
import Students from "./components/students/Students"; // Add this line

function App() {
  const theme = createTheme(THEME);
  const queryClient = new QueryClient();

  return (
    <AppContextProvider>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path={`/${ROLES.ADMIN}`} element={<User />}>
                <Route element={<Professors />} index={true}></Route>
                <Route path="professors" element={<Professors />} />
                <Route path="courses" element={<Courses />} />
                <Route path="students" element={<Students />} />{" "}
              </Route>
              <Route path={`/${ROLES.PROFESSOR}`} element={<User />}>
                <Route element={<></>} index={true}></Route>
                <Route path="home" element={<></>} />
              </Route>
              <Route path={`/${ROLES.STUDENT}`} element={<User />}>
                <Route element={<></>} index={true}></Route>
                <Route path="home" element={<></>} />
              </Route>
            </Routes>
          </ToastContextProvider>
        </QueryClientProvider>
      </MantineProvider>
    </AppContextProvider>
  );
}

export default App;
