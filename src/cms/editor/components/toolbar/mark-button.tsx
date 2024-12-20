import { Button } from '@chakra-ui/react';
import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
  withRef,
} from '@udecode/plate-common/react';

type MarkButtonProps = {
  nodeType: string;
  icon: React.ReactNode;
  clear?: string[] | string;
};

export const MarkButton = withRef<typeof Button, MarkButtonProps>(
  ({ clear, nodeType, icon, ...rest }, ref) => {
    const state = useMarkToolbarButtonState({ clear, nodeType });
    const {
      props: { pressed, ...props },
    } = useMarkToolbarButton(state);

    return (
      <Button
        w="30px"
        size="sm"
        px="2"
        ref={ref}
        variant={pressed ? 'solid' : 'outline'}
        {...props}
        {...rest}
      >
        {icon}
      </Button>
    );
  },
);
