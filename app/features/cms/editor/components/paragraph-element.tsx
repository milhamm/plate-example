import { Text } from "@chakra-ui/react";
import { withRef, PlateElement } from "@udecode/plate-common/react";

export const ParagraphElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement asChild ref={ref} {...props}>
        <Text>{children}</Text>
      </PlateElement>
    );
  }
);
