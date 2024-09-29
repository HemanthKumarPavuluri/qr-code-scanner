import { Button, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./routes.css";
import { ROUTES } from "../../shared/constants";
import { useStore } from "../../store/useStore";

const Routes = () => {
  const navigate = useNavigate();
  const { selectedRoute, setRoute } = useStore();

  const handleMenuItemClick = (route) => {
    setRoute(`/user/${route}`);
    navigate(`/user/${route}`);
  };

  const items = ROUTES.map((child) => (
    <>
      <Box className="routes" py={4}>
        <Button
          className={`/user/${child.name}` == selectedRoute ? "highlight" : ""}
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
