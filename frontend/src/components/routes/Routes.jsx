import { Button, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./routes.css";
import { useEffect } from "react";
import { ROUTES } from "../../shared/constants";
import { useStore } from "../../store/useStore";

const Routes = () => {
  const navigate = useNavigate();
  const { selectedRoute, setRoute, role, setRole } = useStore();

  useEffect(() => {
    if (location?.pathname && setRoute) {
      setRoute(location.pathname);
      setRole(location.pathname.split("/")?.[1]);
    }
  }, [location?.pathname]);

  const handleMenuItemClick = (route) => {
    setRoute(`/${role}/${route}`);
    navigate(`/${role}/${route}`);
  };

  const items = ROUTES.map((child) => (
    <>
      <Box className="routes" py={4}>
        <Button
          className={
            `/${role}/${child.name}` == selectedRoute ? "highlight" : ""
          }
          fullWidth
          justify="start"
          key={child.name}
          variant="subtle"
          onClick={() => handleMenuItemClick(child.name)}
        >
          {child.label}
        </Button>
      </Box>
    </>
  ));

  return <>{items}</>;
};

export default Routes;
