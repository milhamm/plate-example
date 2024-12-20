import { withRef, PlateLeaf } from '@udecode/plate-common/react';

export const BoldLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    return (
      <PlateLeaf asChild ref={ref} {...props}>
        <strong>{children}</strong>
      </PlateLeaf>
    );
  },
);

export const ItalicLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    return (
      <PlateLeaf asChild ref={ref} {...props}>
        <em>{children}</em>
      </PlateLeaf>
    );
  },
);

export const UndelineLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    return (
      <PlateLeaf asChild ref={ref} {...props}>
        <u>{children}</u>
      </PlateLeaf>
    );
  },
);

export const BlockquoteLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    return (
      <PlateLeaf asChild ref={ref} {...props}>
        <blockquote>{children}</blockquote>
      </PlateLeaf>
    );
  },
);
