import React from "react";
import "@mantine/core/styles/global.css";
import "./App.css";
import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import { THEME } from "./shared/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "./shared/components";
import AppContextProvider from "./store/AppContextProvider";
import User from "./components/user/User";
import Courses from "./components/courses/Courses";
import Professors from "./components/professors/Professors";
import Register from "./components/register/Register";

function App() {
  const theme = createTheme(THEME);
  const queryClient = new QueryClient();

  // TODO: add fallback routing
  return (
    <AppContextProvider>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />}></Route>
              <Route path="/user" element={<User />}>
                <Route element={<Courses />} index={true}></Route>
                <Route path="courses" element={<Courses />} />
                <Route path="professors" element={<Professors />} />
              </Route>
            </Routes>
          </ToastContextProvider>
        </QueryClientProvider>
      </MantineProvider>
    </AppContextProvider>
  );
}

export default App;
