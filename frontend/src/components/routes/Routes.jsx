import { Button, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./routes.css";
import { useEffect } from "react";
import {
  ADMIN_ROUTES,
  ROLES,
  PROFESSOR_ROUTES,
  STUDENT_ROUTES,
} from "../../shared/constants";
import { useStore } from "../../store/useStore";

const Routes = () => {
  const navigate = useNavigate();
  const { selectedRoute, setRoute, role, setRole } = useStore();

  useEffect(() => {
    if (location?.pathname && setRoute) {
      setRoute(location.pathname);
      const pathnameRole = location.pathname.split("/")?.[1];
      if (Object.values(ROLES).includes(pathnameRole)) {
        setRole(pathnameRole);
      }
    }
  }, [location?.pathname]);

  const handleMenuItemClick = (route) => {
    setRoute(`/${role}/${route}`);
    navigate(`/${role}/${route}`);
  };

  const getRoutes = () => {
    if (role === ROLES.ADMIN) return ADMIN_ROUTES;
    if (role === ROLES.PROFESSOR) return PROFESSOR_ROUTES;
    if (role === ROLES.STUDENT) return STUDENT_ROUTES;
    return []; // Fallback to prevent undefined
  };

  const items = getRoutes().map((child) => (
    <Box className="routes" py={4} key={child.name}>
      <Button
        className={
          `/${role}/${child.name}` === selectedRoute ? "highlight" : ""
        }
        fullWidth
        justify="start"
        variant="subtle"
        onClick={() => handleMenuItemClick(child.name)}
      >
        {child.label}
      </Button>
    </Box>
  ));

  return <>{items}</>;
};

export default Routes;
