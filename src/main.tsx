import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Box, ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <Box maxW="6xl" mx="auto" px="6">
        <App />
      </Box>
    </ChakraProvider>
  </StrictMode>
);
