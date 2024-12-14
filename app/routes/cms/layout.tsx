import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function CMSLayout() {
  return (
    <Box maxW="6xl" mx="auto" px="6">
      <Outlet />
    </Box>
  );
}
