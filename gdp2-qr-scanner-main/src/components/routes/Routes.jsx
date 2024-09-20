import { Button, Stack } from "@mantine/core";
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
      <Stack p={8} gap={4} className="routes">
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
      </Stack>
    </>
  ));

  return <>{items}</>;
};

export default Routes;
