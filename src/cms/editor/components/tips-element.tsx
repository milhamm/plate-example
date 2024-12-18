import { Box, chakra } from "@chakra-ui/react";
import { withRef, PlateElement } from "@udecode/plate-common/react";

const PlateElementChakra = chakra(PlateElement);

export const TipsElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElementChakra
        asChild
        ref={ref}
        px="4"
        py="1"
        my="4"
        rounded="md"
        data-tips
        display="flex"
        bg="green.100"
        gap="4"
        fontSize="sm"
        {...props}
      >
        <blockquote>
          <Box fontWeight="bold">Tips:</Box>
          {children}
        </blockquote>
      </PlateElementChakra>
    );
  }
);
