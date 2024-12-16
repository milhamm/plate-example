import { chakra } from "@chakra-ui/react";
import { withRef, PlateElement } from "@udecode/plate-common/react";

const PlateElementChakra = chakra(PlateElement);

export const ListElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElementChakra
        asChild
        ref={ref}
        marginInlineStart="1em"
        listStyleType="decimal"
        {...props}
      >
        <ol>{children}</ol>
      </PlateElementChakra>
    );
  }
);

export const UnorderedListElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElementChakra asChild ref={ref} marginInlineStart="1em" {...props}>
        <ul>{children}</ul>
      </PlateElementChakra>
    );
  }
);

export const ListItemElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElementChakra asChild ref={ref} {...props}>
        <li>{children}</li>
      </PlateElementChakra>
    );
  }
);
