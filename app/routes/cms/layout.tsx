import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function CMSLayout() {
  return (
    <Box px="4">
      <Outlet />
    </Box>
  );
}
