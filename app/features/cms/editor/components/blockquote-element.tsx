import { Box } from "@chakra-ui/react";
import { withRef, PlateElement } from "@udecode/plate-common/react";

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement asChild ref={ref} {...props}>
        <Box
          as="blockquote"
          bg="gray.100"
          fontFamily="monospace"
          p="2"
          rounded="lg"
        >
          {children}
        </Box>
      </PlateElement>
    );
  }
);
