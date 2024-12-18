import { chakra } from "@chakra-ui/react";
import { withRef, PlateElement } from "@udecode/plate-common/react";

const PlateElementChakra = chakra(PlateElement);

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElementChakra
        asChild
        ref={ref}
        my="1"
        borderLeft="2px"
        borderLeftColor="gray"
        paddingLeft="6"
        {...props}
      >
        <blockquote>{children}</blockquote>
      </PlateElementChakra>
    );
  }
);
