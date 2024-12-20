import { chakra } from '@chakra-ui/react';
import { withRef, PlateElement } from '@udecode/plate-common/react';

const PlateElementChakra = chakra(PlateElement);

export const ListElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    const size = 20;
    return (
      <PlateElementChakra
        asChild
        ref={ref}
        marginInlineStart={`calc(1.5em + ${size}px)`}
        listStyleType="none"
        sx={{
          counterReset: 'recipe',
          '& li': {
            counterIncrement: 'recipe',
            position: 'relative',
            margin: '0 0 0.5rem 0',
            '&::before': {
              content: "''",
              position: 'absolute',
              top: '.4rem',
              left: `calc(-1 * ${size}px - 20px)`,
              width: `${size}px`,
              height: `${size}px`,
              background: 'blue.500',
              transform: 'rotate(45deg)',
              rounded: 'md',
            },
            '&::after': {
              content: 'counter(recipe)',
              position: 'absolute',
              top: '.4rem',
              textAlign: 'center',
              left: `calc(-1 * ${size}px - 20px)`,
              width: `${size}px`,
              height: `${size}px`,
              lineHeight: `${size}px`,
              color: 'white',
              fontWeight: '500',
              fontSize: 'xs',
            },
          },
        }}
        {...props}
      >
        <ol>{children}</ol>
      </PlateElementChakra>
    );
  },
);

export const UnorderedListElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElementChakra asChild ref={ref} marginInlineStart="1em" {...props}>
        <ul>{children}</ul>
      </PlateElementChakra>
    );
  },
);

export const ListItemElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    return (
      <PlateElementChakra asChild ref={ref} {...props}>
        <li>{children}</li>
      </PlateElementChakra>
    );
  },
);
