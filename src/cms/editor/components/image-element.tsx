import { withRef } from '@udecode/cn';
import { PlateElement, useEditorRef } from '@udecode/plate-common/react';
import { useDraggable, useDraggableState } from '@udecode/plate-dnd';
import { useMediaState } from '@udecode/plate-media/react';

import { Box, Image } from '@chakra-ui/react';

export const ImageElement = withRef<typeof PlateElement>(
  ({ children, nodeProps, ...props }, ref) => {
    const editor = useEditorRef();

    const { focused, selected } = useMediaState();
    const draggableEnabled = !!editor.plugins.dnd;
    const state = draggableEnabled
      ? useDraggableState({ element: props.element })
      : undefined;

    const url = props.element.url as string;

    const isDragging = state?.isDragging ?? false;

    const { handleRef } =
      draggableEnabled && state
        ? useDraggable(state)
        : { handleRef: undefined };

    return (
      <PlateElement
        ref={ref}
        style={{ paddingTop: '10px', paddingBottom: '10px' }}
        {...props}
      >
        <Box
          as="figure"
          position="relative"
          m="0"
          contentEditable={false}
          role="group"
        >
          <Image
            ref={handleRef}
            alt=""
            display="block"
            w="100%"
            maxW="100%"
            cursor="pointer"
            objectFit="cover"
            px="0"
            borderRadius="sm"
            opacity={isDragging ? 0.5 : 1}
            {...nodeProps}
            sx={{
              ...(focused &&
                selected && {
                  outline: '2px solid',
                  outlineColor: 'blue.500',
                  outlineOffset: '2px',
                }),
            }}
            src={url}
          />
        </Box>

        {children}
      </PlateElement>
    );
  },
);
