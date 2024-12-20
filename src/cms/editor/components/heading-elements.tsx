import { Heading } from '@chakra-ui/react';
import { withRef, PlateElement } from '@udecode/plate-common/react';

export const HeadingOneElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElement asChild ref={ref} {...props}>
        <Heading as="h1" size="xl">
          {children}
        </Heading>
      </PlateElement>
    );
  },
);

export const HeadingTwoElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElement asChild ref={ref} {...props}>
        <Heading as="h2" size="lg">
          {children}
        </Heading>
      </PlateElement>
    );
  },
);

export const HeadingThreeElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElement asChild ref={ref} {...props}>
        <Heading as="h3" size="md">
          {children}
        </Heading>
      </PlateElement>
    );
  },
);
