// src/App.jsx
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
import Courses from "./components/admin/courses/Courses";
import Professors from "./components/admin/professors/Professors";
import Students from "./components/admin/students/Students";
import StudentsPage from "./components/admin/students/StudentsPage"; // Import StudentsPage
import ProfessorDashboard from "./components/professors/ProfessorDashboard";
import StudentDashboard from "./components/student/StudentDashboard";

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
                <Route element={<Professors />} index={true} />
                <Route path="professors" element={<Professors />} />
                <Route path="courses" element={<Courses />} />
                <Route path="students" element={<Students />} />
                <Route
                  path="students/distribution"
                  element={<StudentsPage />}
                />{" "}
                {/* Add StudentsPage route */}
              </Route>
              <Route path={`/${ROLES.PROFESSOR}`} element={<User />}>
                <Route path="dashboard" element={<ProfessorDashboard />} />
                <Route element={<ProfessorDashboard />} index={true} />
              </Route>
              <Route path={`/${ROLES.STUDENT}`} element={<User />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route element={<StudentDashboard />} index={true} />
              </Route>
            </Routes>
          </ToastContextProvider>
        </QueryClientProvider>
      </MantineProvider>
    </AppContextProvider>
  );
}

export default App;
